import { NextRequest, NextResponse } from 'next/server';
import { getAmbassadorsByIdNumbers } from '@/db/repositories/ambassadors';
import {
  createOrUpdateCandidates,
  getCandidatesForAssessmentSMS,
  linkCandidatesToOpportunity,
  updateOpportunityCandidates,
} from '@/db/repositories/candidates';
import { getOpportunityById } from '@/db/repositories/opportunities';
import { getSetting } from '@/db/repositories/settings';
import type { OpportunityToCandidateCriteria } from '@/db/schema/candidates';
import { logger } from '@/lib/logger';
import { sendSMS } from '@/lib/sms';
import { SMSTemplate } from '@/ts/enums';
import type { SAYApplicant } from '@/ts/types/applicants';

const BATCH_SIZE = 50;

async function fetchOpportunityCandidates(opportunityId: string) {
  return fetch(
    `${process.env.SAYOUTH_API_URL}/applicant/all?opportunity_id=${opportunityId}`,
    {
      method: 'GET',
      headers: {
        'X-API-VERSION': process.env.SAYOUTH_API_VERSION || '1.0',
        'X-API-KEY': process.env.SAYOUTH_API_KEY || '',
      },
    },
  );
}

async function sendAssessmentSMS(opportunityId: number) {
  try {
    const candidatesToSMS = await getCandidatesForAssessmentSMS(opportunityId);
    const template = await getSetting(SMSTemplate.Assessment);

    if (!candidatesToSMS.length || !template) {
      return;
    }

    candidatesToSMS.forEach(candidate => {
      sendSMS(candidate.candidates.phone, template, {
        name: candidate.candidates.firstName,
        // TODO: generate full link
        link: `${opportunityId}`,
      });
    });

    const candidateIds = candidatesToSMS.map(
      candidate => candidate.candidates.id,
    );
    await updateOpportunityCandidates(candidateIds, opportunityId, {
      assessmentSMSSentAt: new Date(),
    });
  } catch (error) {
    logger.error(error);
  }
}

async function filterAmbassadors(
  applicants: SAYApplicant[],
): Promise<SAYApplicant[]> {
  const filteredApplicants = [];

  for (let i = 0; i < applicants.length; i += BATCH_SIZE) {
    const batch = applicants.slice(i, i + BATCH_SIZE);
    const idNumbers = batch.map(
      applicant => applicant.personal_details.id_number,
    );
    const ambassadorsIds = await getAmbassadorsByIdNumbers(idNumbers);

    filteredApplicants.push(
      ...batch.filter(
        applicant => !ambassadorsIds.has(applicant.personal_details.id_number),
      ),
    );
  }

  return filteredApplicants;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const opportunityId = searchParams.get('opportunityId');

  if (!opportunityId) {
    return NextResponse.json({ message: 'Missing opportunityId', status: 400 });
  }

  try {
    const opportunity = await getOpportunityById(+opportunityId);
    if (opportunity.length < 1 || !opportunity[0].providerId) {
      throw new Error(
        `Error fetching opportunity from database. Opportunity ID: ${opportunityId}`,
      );
    }
    const response = await fetchOpportunityCandidates(
      opportunity[0].providerId,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error fetching candidates from SA Youth. Status: ${response.status}. ${data.errors}`,
      );
    }

    const filteredApplicants = await filterAmbassadors(data.applicants);

    const smsList: SAYApplicant[] = [];
    const criteria: { [key: string]: OpportunityToCandidateCriteria } = {};
    const applicants = filteredApplicants
      .filter(
        (applicant: SAYApplicant) => !!applicant.personal_details.id_number,
      )
      .map((applicant: SAYApplicant) => {
        const step = Number(
          applicant.requirements.meets_minimum_requirements === 'Meets all' &&
            +applicant.requirements.distance_from_opportunity <= 20,
        );

        criteria[applicant.personal_details.id_number] = {
          saYouthRank: applicant.rank,
          meetsAge: !!applicant.requirements.meets_age,
          meetsGender: !!applicant.requirements.meets_gender,
          meetsRace: !!applicant.requirements.meets_race,
          meetsDisability: !!applicant.requirements.meets_disability,
          meetsEducation: !!applicant.requirements.meets_education,
          meetsLanguage: !!applicant.requirements.meets_language,
          distance: applicant.requirements.distance_from_opportunity,
          step,
        };

        if (step) {
          smsList.push(applicant);
        }

        return {
          firstName: applicant.personal_details.first_name,
          lastName: applicant.personal_details.surname,
          idNumber: applicant.personal_details.id_number,
          gender: applicant.personal_details.gender,
          race: applicant.personal_details.race,
          age: applicant.personal_details.age,
          disability: applicant.personal_details.disability,
          phone: applicant.contact_details.cell_number,
          suburb: applicant.address_details.suburb,
          city: applicant.address_details.city,
          province: applicant.address_details.province_name,
          postalCode: applicant.address_details.postal_code,
          hasLicense: !!applicant.skills_and_experience.drivers_licence,
          hasMatric: applicant.education.has_grade_twelve === 'Yes',
          tertiaryEducation: applicant.education.further_study,
          tertiaryLevel: applicant.education.highest_course_level_completed,
          tertiaryField: applicant.education.main_field_of_study_completed,
          tertiaryName: applicant.education.qualification_name_completed,
        };
      });

    const candidates = await createOrUpdateCandidates(applicants);
    const candidatesToLink = candidates.map(candidate => ({
      candidateId: candidate.id,
      opportunityId: +opportunityId,
      ...criteria[candidate.idNumber],
    }));

    await linkCandidatesToOpportunity(candidatesToLink);
    sendAssessmentSMS(+opportunityId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json({
      message: 'Error importing candidates',
      status: 422,
    });
  }
}
