import type { ContractType, SalaryType } from '@/db/schema/opportunities';
import {
  SAYAge,
  SAYContractDuration,
  SAYContractType,
  SAYEducation,
  SAYGender,
  SAYLanguage,
  SAYRace,
  SAYSalaryFrequency,
  SAYSalaryType,
} from '@/ts/enums';

export const contractTypeTextMapping: Record<ContractType, string> = {
  fixed: 'Fixed-term',
  fullTime: 'Full-time permanent',
  partTime: 'Permanent part-time',
};

export const contractTypeValueMapping: Record<ContractType, SAYContractType> = {
  fixed: SAYContractType.FixedTerm,
  fullTime: SAYContractType.Permanent,
  partTime: SAYContractType.PartTime,
};

export const salaryTypeTextMapping: Record<SalaryType, string> = {
  baseFixed: 'Base pay on fixed amount only',
  baseHourly: 'Base pay on hourly rate only',
  baseCommission: 'Base pay with commission',
  baseCommissionBenefits: 'Base pay with commission and benefits',
  stipend: 'Stipend',
  commissionOnly: 'Commission only',
  unspecified: "I don't want to specify salary now",
};

export const salaryTypeValueMapping: Record<SalaryType, SAYSalaryType> = {
  baseFixed: SAYSalaryType.BasePayOnFixedAmountOnly,
  baseHourly: SAYSalaryType.BasePayBasedOnHourlyRateOnly,
  baseCommission: SAYSalaryType.BasePayWithCommission,
  baseCommissionBenefits: SAYSalaryType.BasePayWithCommissionAndBenefits,
  stipend: SAYSalaryType.Stipend,
  commissionOnly: SAYSalaryType.CommissionOnly,
  unspecified: SAYSalaryType.IDontWantToSpecifyASalaryNow,
};

export const salaryFrequencyTextMapping: Record<string, string> = {
  weekly: 'Weekly',
  biweekly: 'Biweekly',
  monthly: 'Monthly',
  perUnit: 'Per unit of work',
};

export const salaryFrequencyValueMapping: Record<string, SAYSalaryFrequency> = {
  weekly: SAYSalaryFrequency.Weekly,
  biweekly: SAYSalaryFrequency.Biweekly,
  monthly: SAYSalaryFrequency.Monthly,
  perUnit: SAYSalaryFrequency.PerUnit,
};

export const educationTextMapping: Record<string, string> = {
  degree: 'Degree',
  diploma: 'Diploma',
  matric: 'Matric',
  postgrad: 'Post Graduate Degree',
  tvet: 'TVET Certificate N4-N6',
};

const educationValueMapping: Record<string, SAYEducation> = {
  degree: SAYEducation.Degree,
  diploma: SAYEducation.Diplmoa,
  matric: SAYEducation.Matric,
  postgrad: SAYEducation.Postgrad,
  tvet: SAYEducation.TVET,
};

export function resolveEducationMapping(array: string[]): SAYEducation[] {
  return array.map(education => educationValueMapping[education]);
}

export const languageTextMapping: Record<string, string> = {
  afrikaans: 'Afrikaans',
  english: 'English',
  isiNdebele: 'isiNdebele',
  isiXhosa: 'isiXhosa',
  isiZulu: 'isiZulu',
  sepedi: 'Sepedi',
  sesotho: 'Sesotho',
  setswana: 'Setswana',
  siSwati: 'siSwati',
  tshivenda: 'Tshivenda',
  xitsonga: 'Xitsonga',
  german: 'German',
  french: 'French',
  portuguese: 'Portuguese',
};

const languageValueMapping: Record<string, SAYLanguage> = {
  afrikaans: SAYLanguage.Afrikaans,
  english: SAYLanguage.English,
  isiNdebele: SAYLanguage.IsiNdebele,
  isiXhosa: SAYLanguage.IsiXhosa,
  isiZulu: SAYLanguage.IsiZulu,
  sepedi: SAYLanguage.Sepedi,
  sesotho: SAYLanguage.Sesotho,
  setswana: SAYLanguage.Setswana,
  siSwati: SAYLanguage.SiSwati,
  tshivenda: SAYLanguage.Tshivenda,
  xitsonga: SAYLanguage.Xitsonga,
  german: SAYLanguage.German,
  french: SAYLanguage.French,
  portuguese: SAYLanguage.Portuguese,
};

export function resolveLanguageMapping(array: string[]): SAYLanguage[] {
  return array.map(language => languageValueMapping[language]);
}

export const genderTextMapping: Record<string, string> = {
  all: 'All',
  male: 'Male',
  female: 'Female',
};

const genderValueMapping: Record<string, SAYGender> = {
  all: SAYGender.All,
  male: SAYGender.Male,
  female: SAYGender.Female,
};

export function resolveGenderMapping(array: string[]): SAYGender[] {
  return array.map(gender => genderValueMapping[gender]);
}

export const raceTextMapping: Record<string, string> = {
  all: 'All',
  asian: 'Asian',
  black: 'Black',
  coloured: 'Coloured',
  indian: 'Indian',
  white: 'White',
};

const raceValueMapping: Record<string, SAYRace> = {
  all: SAYRace.All,
  asian: SAYRace.Asian,
  black: SAYRace.Black,
  coloured: SAYRace.Coloured,
  indian: SAYRace.Indian,
  white: SAYRace.White,
};

export function resolveRaceMapping(array: string[]): SAYRace[] {
  return array.map(race => raceValueMapping[race]);
}

export const ageValueMapping: Record<number, SAYAge> = {
  18: SAYAge.Eighteen,
  19: SAYAge.Nineteen,
  20: SAYAge.Twenty,
  21: SAYAge.TwentyOne,
  22: SAYAge.TwentyTwo,
  23: SAYAge.TwentyThree,
  24: SAYAge.TwentyFour,
  25: SAYAge.TwentyFive,
  26: SAYAge.TwentySix,
  27: SAYAge.TwentySeven,
  28: SAYAge.TwentyEight,
  29: SAYAge.TwentyNine,
  30: SAYAge.Thirty,
  31: SAYAge.ThirtyOne,
  32: SAYAge.ThirtyTwo,
  33: SAYAge.ThirtyThree,
  34: SAYAge.ThirtyFour,
};

export function resolveContactDuration(duration: number): SAYContractDuration {
  if (duration <= 3) {
    return SAYContractDuration.ThreeMonths;
  } else if (duration <= 6) {
    return SAYContractDuration.ThreeToSixMonths;
  } else if (duration <= 12) {
    return SAYContractDuration.SixToTwelveMonths;
  } else if (duration <= 24) {
    return SAYContractDuration.TwelveMonths;
  } else {
    return SAYContractDuration.TwentyFourMonths;
  }
}

export const candidateSteps: Record<number, string> = {
  0: 'Imported',
  1: 'Assessment',
  2: 'Passed',
  3: 'Shortlist',
};
