import {
  boolean,
  primaryKey,
  real,
  serial,
  text,
  pgTable,
} from 'drizzle-orm/pg-core';
import { candidates } from './candidates';
import { opportunities } from './opportunities';

export const questions = pgTable('assessment_questions', {
  id: serial('id').primaryKey(),
  category: serial('category_id')
    .notNull()
    .references(() => categories.id),
  question: text('question').notNull(),
  preScreening: boolean('pre_screening').notNull(),
});

export const answers = pgTable('assessment_answers', {
  id: serial('id').primaryKey(),
  questionId: serial('question_id')
    .notNull()
    .references(() => questions.id),
  answer: text('answer').notNull(),
  weight: real('weight').notNull().default(0),
});

export const categories = pgTable('assessment_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const userAnswers = pgTable(
  'candidate_answers',
  {
    candidateId: serial('candidate_id')
      .notNull()
      .references(() => candidates.id),
    opportunityId: serial('opportunity_id')
      .notNull()
      .references(() => opportunities.id),
    questionId: serial('question_id')
      .notNull()
      .references(() => questions.id),
    answerId: serial('answer_id')
      .notNull()
      .references(() => answers.id),
  },
  table => ({
    pk: primaryKey(
      table.candidateId,
      table.opportunityId,
      table.questionId,
      table.answerId,
    ),
  }),
);

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
export type Answer = typeof answers.$inferSelect;
export type NewAnswer = typeof answers.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type UserAnswer = typeof userAnswers.$inferSelect;
export type NewUserAnswer = typeof userAnswers.$inferInsert;
