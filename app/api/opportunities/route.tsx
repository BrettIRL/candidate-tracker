import { NextResponse } from 'next/server';
import { insertOpportunityWithTransaction } from '@/db/repositories/opportunities';
import { logger } from '@/lib/logger';
import {
  ageValueMapping,
  contractTypeValueMapping,
  resolveContactDuration,
  resolveEducationMapping,
  resolveGenderMapping,
  resolveLanguageMapping,
  resolveRaceMapping,
  salaryFrequencyValueMapping,
  salaryTypeValueMapping,
} from '@/lib/mappings';
import { SAYArchetypalRole, SAYBoolean, SAYIndustry } from '@/ts/enums';
import { SAYouthOpportunity } from '@/ts/types';
import { addOpportunitySchema } from '@/validations/opportunity';

async function postOpportunity(data: SAYouthOpportunity) {
  const url = process.env.SAYOUTH_API_URL + '/opportunity';
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-VERSION': '1.0',
      'X-API-KEY': process.env.SAYOUTH_API_KEY || '',
    },
    body: JSON.stringify(data),
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (data.closingDate) {
      data.closingDate = new Date(data.closingDate);
    }
    const parsed = addOpportunitySchema.parse(data);

    const saYouthData = {
      opportunity_holder: process.env.SAYOUTH_OPPORTUNITY_HOLDER || '',
      yes_opportunity: parsed.yesOpportunity
        ? SAYBoolean.True
        : SAYBoolean.False,
      youth_service_programme: parsed.yesOpportunity
        ? SAYBoolean.True
        : SAYBoolean.False,
      title: parsed.title,
      description: parsed.description || null,
      industry: SAYIndustry.Retail,
      archetypal_role: SAYArchetypalRole.Sales,
      contract_type: contractTypeValueMapping[parsed.contractType],
      duration:
        parsed.contractType !== 'fullTime'
          ? resolveContactDuration(parsed.duration)
          : null,
      number_people: parsed.capacity.toString(),
      close_date: parsed.closingDate.toISOString(),
      salary_type: salaryTypeValueMapping[parsed.salaryType],
      salary_frequency:
        parsed.salaryType !== 'unspecified' && parsed.salaryFrequency
          ? salaryFrequencyValueMapping[parsed.salaryFrequency]
          : null,
      salary:
        parsed.salaryType !== 'unspecified' ? parsed.salary.toString() : null,
      benefits: parsed.benefits || null,
      requirements: parsed.requirements,
      education_requirements: parsed.education.length
        ? resolveEducationMapping(parsed.education)
        : null,
      language_requirements: parsed.language.length
        ? resolveLanguageMapping(parsed.language)
        : null,
      disability_required: SAYBoolean.False,
      gender_requirements: parsed.gender.length
        ? resolveGenderMapping(parsed.gender)
        : null,
      race_requirements: parsed.race.length
        ? resolveRaceMapping(parsed.race)
        : null,
      min_age: ageValueMapping[parsed.minAge],
      max_age: ageValueMapping[parsed.maxAge],
      address: {
        address_name: parsed.address.name,
        address_line_1: parsed.address.address1,
        suburb_name: parsed.address.address2,
        city_name: parsed.address.city,
        province: parsed.address.province,
        postal_code: parsed.address.postalCode,
      },
      address_contact: {
        first_name: parsed.address.contactName,
        surname: parsed.address.contactSurname,
        email_address: parsed.address.contactEmail,
        phone_number: parsed.address.contactPhone,
      },
    };

    const opportunity = await insertOpportunityWithTransaction(
      {
        ...parsed,
        closingDate: parsed.closingDate.toISOString(),
        salary: parsed.salary.toString(),
        address: parsed.address.id,
      },
      postOpportunity(saYouthData),
    );

    return NextResponse.json(opportunity, { status: 201 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json('Error creating opportunity', { status: 422 });
  }
}
