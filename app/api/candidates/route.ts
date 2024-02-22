import { NextResponse } from 'next/server';
import {
  changeStep,
  getOpportunityCandidatesById,
  updateOpportunityCandidates,
} from '@/db/repositories/candidates';
import { getSetting } from '@/db/repositories/settings';
import { logger } from '@/lib/logger';
import { smsTimestamps } from '@/lib/mappings';
import { sendSMS } from '@/lib/sms';
import { SMSTemplate } from '@/ts/enums';

async function sendCandidateSMS(
  candidateIds: number[],
  opportunityId: number,
  smsType: SMSTemplate,
) {
  try {
    const candidatesToSMS = await getOpportunityCandidatesById(
      candidateIds,
      opportunityId,
      smsTimestamps[smsType],
    );
    const template = await getSetting(smsType);

    if (!candidatesToSMS.length || !template) {
      return;
    }

    candidatesToSMS.forEach(candidate => {
      sendSMS(candidate.candidates.phone, template, {
        name: candidate.candidates.firstName,
        // TODO: generate actual link
        link: `https://example.com/a/${opportunityId}`,
      });
    });

    await updateOpportunityCandidates(candidateIds, opportunityId, {
      [smsTimestamps[smsType]]: new Date(),
    });
  } catch (error) {
    logger.error(error);
  }
}

export async function PATCH(req: Request) {
  const { candidateIds, opportunityId, step } = await req.json();

  if (!candidateIds.length || !opportunityId || step === undefined) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    );
  }

  try {
    await changeStep(candidateIds, opportunityId, step);

    if (step === 1) {
      sendCandidateSMS(candidateIds, opportunityId, SMSTemplate.Assessment);
    } else if (step === 4) {
      sendCandidateSMS(candidateIds, opportunityId, SMSTemplate.Shortlist);
    } else if (step === 5) {
      sendCandidateSMS(candidateIds, opportunityId, SMSTemplate.Successful);
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error changing candidate step' },
      { status: 422 },
    );
  }
}
