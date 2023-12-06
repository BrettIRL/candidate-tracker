import { relations } from 'drizzle-orm';
import {
  integer,
  serial,
  text,
  pgTable,
  primaryKey,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { opportunities } from './opportunities';

export const candidates = pgTable('candidates', {
  id: serial('id').notNull().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  idNumber: text('id_number').notNull().unique(),
  gender: text('gender').notNull(),
  race: text('race').notNull(),
  age: integer('age').notNull(),
  disability: text('disability'),
  phone: text('phone').notNull(),
  suburb: text('suburb'),
  city: text('city'),
  province: text('province'),
  postalCode: text('postal_code'),
  hasLicense: boolean('has_license').notNull(),
  hasMatric: boolean('has_matric').notNull(),
  tertiaryEducation: text('tertiary_education'),
  tertiaryLevel: text('tertiary_level'),
  tertiaryField: text('tertiary_field'),
  tertiaryName: text('tertiary_name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const candidatesRelations = relations(candidates, ({ many }) => ({
  opportunitiesToCandidates: many(opportunitiesToCandidates),
}));

export const opportunitiesToCandidates = pgTable(
  'opportunities_to_candidates',
  {
    opportunityId: integer('opportunityId')
      .notNull()
      .references(() => opportunities.id),
    candidateId: integer('candidateId')
      .notNull()
      .references(() => candidates.id),
    saYouthRank: integer('sayouth_rank').notNull(),
    meetsAge: boolean('meets_age').notNull(),
    meetsGender: boolean('meets_gender').notNull(),
    meetsRace: boolean('meets_race').notNull(),
    meetsDisability: boolean('meets_disability').notNull(),
    meetsEducation: boolean('meets_education').notNull(),
    meetsLanguage: boolean('meets_language').notNull(),
    distance: text('distance').notNull(),
    step: integer('step').notNull().default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  table => ({
    pk: primaryKey(table.opportunityId, table.candidateId),
  }),
);

export const opportunitiesToCandidatesRelations = relations(
  opportunitiesToCandidates,
  ({ one }) => ({
    candidate: one(candidates, {
      fields: [opportunitiesToCandidates.candidateId],
      references: [candidates.id],
    }),
    opportunity: one(opportunities, {
      fields: [opportunitiesToCandidates.opportunityId],
      references: [opportunities.id],
    }),
  }),
);

export type Candidate = typeof candidates.$inferSelect;
export type NewCandidate = typeof candidates.$inferInsert;

export type OpportunityToCandidate =
  typeof opportunitiesToCandidates.$inferSelect;
export type NewOpportunityToCandidate =
  typeof opportunitiesToCandidates.$inferInsert;
export type OpportunityToCandidateCriteria = Omit<
  NewOpportunityToCandidate,
  'opportunityId' | 'candidateId' | 'step' | 'createdAt' | 'updatedAt'
>;
