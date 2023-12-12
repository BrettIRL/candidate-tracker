export type SAYApplicant = {
  rank: number;
  requirements: {
    meets_minimum_requirements: string;
    meets_age: number;
    meets_gender: number;
    meets_race: number;
    meets_education: number;
    meets_language: number;
    meets_disability: number;
    distance_from_opportunity: string;
  };
  personal_details: {
    first_name: string;
    surname: string;
    id_number: string;
    gender: string;
    race: string;
    age: number;
    disability: string;
  };
  contact_details: {
    cell_number: string;
  };
  address_details: {
    suburb: string;
    city: string;
    province_name: string;
    postal_code: string;
  };
  skills_and_experience: {
    drivers_licence: string;
  };
  education: {
    has_grade_twelve: string;
    further_study: string;
    highest_course_level_completed: string;
    main_field_of_study_completed: string;
    qualification_name_completed: string;
  };
};
