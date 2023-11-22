// NOTE: ALl enums with SAY prefix are
// for values in the SA Youth API

export enum SAYBoolean {
  True = 'Yes',
  False = 'No',
}

export enum SAYIndustry {
  Agriculture = 'Agriculture',
  Analytics = 'Analytics',
  Banking = 'Banking',
  BusinessProcessOutsourcing = 'BusinessProcessOutsourcing',
  Construction = 'Construction',
  Education = 'Education',
  FastFood = 'FastFood',
  FoodAgriProcessing = 'FoodAgriProcessing',
  GovernmentServices = 'GovernmentServices',
  Health = 'Health',
  HotelBnB = 'HotelBAndB',
  ICT = 'ICT',
  Insurance = 'Insurance',
  LargeManufacturing = 'LargeIndustryManufacturing',
  LightManufacturing = 'LightManufacturingInclTech',
  Mining = 'Mining',
  OtherBusiness = 'OtherBusinessService',
  OtherCommunity = 'OtherCommunity',
  OtherFinance = 'OtherFinanceInclRealEstate',
  Personal = 'PersonalServices',
  Police = 'PoliceAndDefence',
  ProfessionalServices = 'ProfessionalServices',
  Restaurant = 'Restaurant',
  Retail = 'Retail',
  TransportAndLogistics = 'TransportAndLogistics',
  Utilities = 'Utilities',
}

export enum SAYArchetypalRole {
  Administration = 'Administration',
  CallCentre = 'Callcentrework',
  Caretaking = 'Caretakinghealthcarework',
  Retail = 'Cashierorretailservicerelated',
  Coding = 'Codingdesigningandwebrelatedwork',
  CommunityService = 'Communityservicework',
  DataAnalytics = 'Dataandanalytics',
  Driver = 'Driver',
  Entrepreneurial = 'Entrepreneurialhustling',
  Physical = 'Hardphysicalwork',
  Maintenance = 'Installationassemblyrepairandmaintenancemanufacturing',
  LightPhysical = 'Lightphysicalwork',
  Professional = 'Professionalneedingspecificqualification',
  Sales = 'Saleswork',
  Security = 'Security',
  Service = 'Servicework',
  Teaching = 'Teachingtutoring',
  TeamLead = 'Teamlead',
  Other = 'Other',
}

export enum SAYContractType {
  FixedTerm = 'Fixedterm',
  Permanent = 'Fulltimepermanent',
  PartTime = 'Permanentparttime',
  EmploymentProgramme = 'Paidemploymentprogramme',
}

export enum SAYContractDuration {
  ThreeMonths = 'ThreeMonths',
  ThreeToSixMonths = 'ThreeToSixMonths',
  SixToTwelveMonths = 'SixToTwelveMonths',
  TwelveMonths = 'TwelveMonths',
  TwentyFourMonths = 'TwentyFourMonths',
}

export enum SAYSalaryType {
  BasePayOnFixedAmountOnly = 'BasePayOnFixedAmountOnly',
  BasePayBasedOnHourlyRateOnly = 'BasePayBasedOnHourlyRateOnly',
  BasePayWithCommission = 'BasePayWithCommission',
  BasePayWithCommissionAndBenefits = 'BasePayWithCommissionAndBenefits',
  Stipend = 'Stipend',
  CommissionOnly = 'CommissionOnly',
  IDontWantToSpecifyASalaryNow = 'IDontWantToSpecifyASalaryNow',
}

export enum SAYSalaryFrequency {
  Weekly = 'PerWeek',
  Biweekly = 'Fortnightly',
  Monthly = 'PerMonth',
  PerUnit = 'PerUnitOfWork',
}

export enum SAYEducation {
  Matric = 'MustHaveMatric',
  Diplmoa = 'MustHaveADiploma',
  Degree = 'MustHaveADegree',
  Postgrad = 'MustHaveAPostGraduateDegree',
  TVET = 'TVETCertificateN4ToN6',
}

export enum SAYLanguage {
  English = 'English',
  Afrikaans = 'Afrikaans',
  IsiNdebele = 'IsiNdebele',
  IsiXhosa = 'IsiXhosa',
  IsiZulu = 'IsiZulu',
  Sepedi = 'Sepedi',
  Sesotho = 'Sesotho',
  Setswana = 'Setswana',
  SiSwati = 'SiSwati',
  Tshivenda = 'Tshivenda',
  Xitsonga = 'Xitsonga',
  German = 'German',
  French = 'French',
  Portuguese = 'Portuguese',
}

export enum SAYGender {
  All = 'All',
  Female = 'Female',
  Male = 'Male',
}

export enum SAYRace {
  All = 'All',
  Black = 'AfricanBlack',
  Coloured = 'Coloured',
  White = 'White',
  Indian = 'Indian',
  Asian = 'Asian',
}

export enum SAYAge {
  Eighteen = 'Eighteen',
  Nineteen = 'Nineteen',
  Twenty = 'Twenty',
  TwentyOne = 'TwentyOne',
  TwentyTwo = 'TwentyTwo',
  TwentyThree = 'TwentyThree',
  TwentyFour = 'TwentyFour',
  TwentyFive = 'TwentyFive',
  TwentySix = 'TwentySix',
  TwentySeven = 'TwentySeven',
  TwentyEight = 'TwentyEight',
  TwentyNine = 'TwentyNine',
  Thirty = 'Thirty',
  ThirtyOne = 'ThirtyOne',
  ThirtyTwo = 'ThirtyTwo',
  ThirtyThree = 'ThirtyThree',
  ThirtyFour = 'ThirtyFour',
}
