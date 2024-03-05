'use server';

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
import { OpportunityValues } from '@/validations/opportunity';

async function postOpportunity(data: SAYouthOpportunity) {
  const url = process.env.SAYOUTH_API_URL + '/opportunity';
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'X-API-VERSION': process.env.SAYOUTH_API_VERSION || '1.0',
      'X-API-KEY': process.env.SAYOUTH_API_KEY || '',
    },
    body: JSON.stringify(data),
  });
}

export async function createOpportunity(data: OpportunityValues) {
  const saYouthData = {
    opportunity_holder: process.env.SAYOUTH_OPPORTUNITY_HOLDER || '',
    yes_opportunity: data.yesOpportunity ? SAYBoolean.True : SAYBoolean.False,
    youth_service_programme: data.yesOpportunity
      ? SAYBoolean.True
      : SAYBoolean.False,
    title: data.title,
    description: data.description || null,
    industry: SAYIndustry.Retail,
    archetypal_role: SAYArchetypalRole.Sales,
    contract_type: contractTypeValueMapping[data.contractType],
    duration:
      data.contractType !== 'fullTime'
        ? resolveContactDuration(data.duration)
        : null,
    number_people: data.capacity.toString(),
    close_date: data.closingDate.toISOString(),
    salary_type: salaryTypeValueMapping[data.salaryType],
    salary_frequency:
      data.salaryType !== 'unspecified' && data.salaryFrequency
        ? salaryFrequencyValueMapping[data.salaryFrequency]
        : null,
    salary: data.salaryType !== 'unspecified' ? data.salary.toString() : null,
    benefits: data.benefits || null,
    requirements: data.requirements,
    education_requirements: data.education.length
      ? resolveEducationMapping(data.education)
      : null,
    language_requirements: data.language.length
      ? resolveLanguageMapping(data.language)
      : null,
    disability_required: SAYBoolean.False,
    gender_requirements: data.gender.length
      ? resolveGenderMapping(data.gender)
      : null,
    race_requirements: data.race.length ? resolveRaceMapping(data.race) : null,
    min_age: ageValueMapping[data.minAge],
    max_age: ageValueMapping[data.maxAge],
    address: {
      address_name: data.address.name,
      address_line_1: data.address.address1,
      suburb_name: data.address.address2,
      city_name: data.address.city,
      province: data.address.province,
      postal_code: data.address.postalCode,
    },
    address_contact: {
      first_name: data.address.contactName,
      surname: data.address.contactSurname,
      email_address: data.address.contactEmail,
      phone_number: data.address.contactPhone,
    },
  };

  try {
    const opportunity = await insertOpportunityWithTransaction(
      {
        ...data,
        closingDate: data.closingDate.toISOString(),
        salary: data.salary.toString(),
        address: data.address.id,
      },
      postOpportunity(saYouthData),
    );

    return { success: true, data: opportunity };
  } catch (error) {
    logger.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: 'An error occured while creating the opportunity.',
    };
  }
}
