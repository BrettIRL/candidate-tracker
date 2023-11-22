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

export const contractEnum = pgEnum('contactType', [
  'fixed',
  'fullTime',
  'partTime',
]);

export const salaryTypeEnum = pgEnum('salaryType', [
  'baseFixed',
  'baseHourly',
  'baseCommission',
  'baseCommissionBenefits',
  'stipend',
  'commissionOnly',
  'unspecified',
]);

export const salaryFrequencyEnum = pgEnum('salaryFrequency', [
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
  providerId: text('providerId'),
  title: text('title').notNull(),
  contractType: contractEnum('contactType').notNull(),
  capacity: integer('capacity').notNull(),
  closingDate: date('closingDate').notNull(),
  salaryType: salaryTypeEnum('salaryType').notNull(),
  salaryFrequency: salaryFrequencyEnum('salaryFrequency'),
  salary: numeric('salary', { precision: 10, scale: 2 }),
  benefits: text('benefits'),
  requirements: text('requirements').notNull(),
  education: educationEnum('education').array(),
  language: languageEnum('language').array().notNull(),
  gender: genderEnum('gender').array().notNull(),
  race: raceEnum('race').array().notNull(),
  minAge: integer('minAge'),
  maxAge: integer('maxAge'),
  address: serial('addressId').references(() => addresses.id, {
    onDelete: 'restrict',
  }),
});

export type Opportunity = typeof opportunities.$inferSelect;
export type NewOpportunity = typeof opportunities.$inferInsert;

export type ContractType = Opportunity['contractType'];
export type SalaryType = Opportunity['salaryType'];
