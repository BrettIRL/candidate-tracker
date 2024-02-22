import { relations } from 'drizzle-orm';
import {
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { addresses } from './addresses';
import { opportunitiesToCandidates } from './candidates';

export const contractEnum = pgEnum('contact_type', [
  'fixed',
  'fullTime',
  'partTime',
]);

export const salaryTypeEnum = pgEnum('salary_type', [
  'baseFixed',
  'baseHourly',
  'baseCommission',
  'baseCommissionBenefits',
  'stipend',
  'commissionOnly',
  'unspecified',
]);

export const salaryFrequencyEnum = pgEnum('salary_frequency', [
  'weekly',
  'biweekly',
  'monthly',
  'perUnit',
]);

export const educationEnum = pgEnum('education', [
  'matric',
  'diploma',
  'degree',
  'postgrad',
  'tvet',
]);

export const languageEnum = pgEnum('language', [
  'english',
  'afrikaans',
  'isiNdebele',
  'isiXhosa',
  'isiZulu',
  'sepedi',
  'sesotho',
  'setswana',
  'siSwati',
  'tshivenda',
  'xitsonga',
  'german',
  'french',
  'portuguese',
]);

export const genderEnum = pgEnum('gender', ['all', 'male', 'female']);

export const raceEnum = pgEnum('race', [
  'all',
  'asian',
  'black',
  'coloured',
  'indian',
  'white',
]);

export const opportunities = pgTable('opportunities', {
  id: serial('id').primaryKey(),
  providerId: text('provider_id'),
  title: text('title').notNull(),
  description: text('description'),
  contractType: contractEnum('contact_type').notNull(),
  capacity: integer('capacity').notNull(),
  closingDate: date('closing_date').notNull(),
  salaryType: salaryTypeEnum('salary_type').notNull(),
  salaryFrequency: salaryFrequencyEnum('salary_frequency'),
  salary: numeric('salary', { precision: 10, scale: 2 }),
  benefits: text('benefits'),
  requirements: text('requirements').notNull(),
  education: educationEnum('education').array(),
  language: languageEnum('language').array().notNull(),
  gender: genderEnum('gender').array().notNull(),
  race: raceEnum('race').array().notNull(),
  minAge: integer('min_age'),
  maxAge: integer('max_age'),
  address: serial('address_id').references(() => addresses.id, {
    onDelete: 'restrict',
  }),
});

export const opportunitiesRelations = relations(opportunities, ({ many }) => ({
  opportunitiesToCandidates: many(opportunitiesToCandidates),
}));

export type Opportunity = typeof opportunities.$inferSelect;
export type NewOpportunity = typeof opportunities.$inferInsert;

export type ContractType = Opportunity['contractType'];
export type SalaryType = Opportunity['salaryType'];
