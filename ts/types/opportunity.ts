import {
  SAYArchetypalRole,
  SAYContractType,
  SAYContractDuration,
  SAYIndustry,
  SAYSalaryType,
  SAYSalaryFrequency,
  SAYEducation,
  SAYLanguage,
  SAYBoolean,
  SAYGender,
  SAYRace,
  SAYAge,
} from '@/ts/enums';

type ISO8601DateString = string;

type SAYAddress = {
  address_name: string;
  address_line_1: string;
  suburb_name: string;
  city_name: string;
  province: string;
  postal_code: string;
};

type SAYAddressContact = {
  first_name: string;
  surname: string;
  email_address: string;
  phone_number: string | null;
};

export type SAYouthOpportunity = {
  opportunity_holder: string;
  yes_opportunity: SAYBoolean;
  youth_service_programme: SAYBoolean;
  title: string;
  description: string | null;
  industry: SAYIndustry;
  archetypal_role: SAYArchetypalRole;
  contract_type: SAYContractType;
  duration?: SAYContractDuration | null;
  number_people: string;
  close_date: ISO8601DateString;
  salary_type: SAYSalaryType;
  salary_frequency: SAYSalaryFrequency | null;
  salary: string | null;
  benefits: string | null;
  requirements: string;
  education_requirements: SAYEducation[] | null;
  language_requirements: SAYLanguage[] | null;
  disability_required: SAYBoolean;
  gender_requirements: SAYGender[] | null;
  race_requirements: SAYRace[] | null;
  min_age: SAYAge;
  max_age: SAYAge;
  address: SAYAddress;
  address_contact: SAYAddressContact;
};
