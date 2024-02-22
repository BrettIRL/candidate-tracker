import { and, eq, inArray, sql } from 'drizzle-orm';
import { opportunitiesToCandidates } from '../schema/candidates';
import {
  type NewCategory,
  categories,
  questions,
  answers,
  type NewAnswer,
  type NewQuestion,
  type NewUserAnswer,
  userAnswers,
} from '@/db/schema/assessment';
import { db } from '@/lib/db';
import { logger } from '@/lib/logger';

export async function deleteCategory(categoryId: number) {
  return db.delete(categories).where(eq(categories.id, categoryId));
}

export async function getCategories() {
  return db.select().from(categories);
}

export async function insertCategory(category: NewCategory) {
  return db.insert(categories).values(category).returning();
}
export async function deleteQuestion(questionId: number) {
  return db.transaction(async tx => {
    try {
      await tx.delete(answers).where(eq(answers.questionId, questionId));
      await tx.delete(questions).where(eq(questions.id, questionId));

      return true;
    } catch (error) {
      logger.error(error);
      tx.rollback();
      return false;
    }
  });
}

export async function getCandidatePrescreeningAnswers(
  candidateId: number,
  opportunityId: number,
) {
  return db
    .select({
      answers: sql<
        {
          question: string;
          answer: string;
        }[]
      >`json_agg(json_build_object('question', ${questions.question}, 'answer', ${answers.answer}))`,
    })
    .from(userAnswers)
    .innerJoin(questions, eq(questions.id, userAnswers.questionId))
    .innerJoin(answers, eq(answers.id, userAnswers.answerId))
    .where(
      and(
        eq(userAnswers.candidateId, candidateId),
        eq(userAnswers.opportunityId, opportunityId),
      ),
    )
    .groupBy();
}

export async function getQuestions() {
  return db
    .select({
      id: questions.id,
      question: questions.question,
      category: categories.name,
      preScreening: questions.preScreening,
    })
    .from(questions)
    .innerJoin(categories, eq(questions.category, categories.id));
}

export async function getQuestionsAndAnswers() {
  return db
    .select({
      id: questions.id,
      question: questions.question,
      category: categories.name,
      answers: sql`array_agg(json_build_object('id', ${answers.id}, 'answer', ${answers.answer}, 'answer', ${answers.answer}, 'weight', ${answers.weight}))`,
    })
    .from(questions)
    .innerJoin(categories, eq(questions.category, categories.id))
    .innerJoin(answers, eq(answers.questionId, questions.id))
    .where(eq(questions.preScreening, false))
    .groupBy(questions.id, categories.name);
}

export async function getPrescreeningQuestions() {
  return db
    .select({
      id: questions.id,
      question: questions.question,
      category: categories.name,
      answers: sql`array_agg(json_build_object('id', ${answers.id}, 'answer', ${answers.answer}, 'answer', ${answers.answer}, 'weight', ${answers.weight}))`,
    })
    .from(questions)
    .innerJoin(categories, eq(questions.category, categories.id))
    .innerJoin(answers, eq(answers.questionId, questions.id))
    .where(eq(questions.preScreening, true))
    .groupBy(questions.id, categories.name);
}

export async function getQuestionsById(questionIds: number[]) {
  return db
    .select({
      id: questions.id,
      answers: sql`array_agg(json_build_object('id', ${answers.id}, 'weight', ${answers.weight}))`,
    })
    .from(questions)
    .innerJoin(answers, eq(answers.questionId, questions.id))
    .where(inArray(questions.id, questionIds))
    .groupBy(questions.id);
}

export async function insertQuestion(
  assessmentQuestion: NewQuestion,
  assessmentAnswers: NewAnswer[],
) {
  return db.transaction(async tx => {
    try {
      const question = await tx
        .insert(questions)
        .values(assessmentQuestion)
        .returning();

      const linkedAnswers = assessmentAnswers.map(answer => {
        answer.questionId = question[0].id;
        return answer;
      });

      const newAnswers = await tx
        .insert(answers)
        .values(linkedAnswers)
        .returning();

      return { ...question[0], answers: newAnswers };
    } catch (error) {
      logger.error(error);
      tx.rollback();
      return {};
    }
  });
}

export async function insertAnswersWithTransaction(
  candidateId: number,
  opportunityId: number,
  answers: NewUserAnswer[],
  prescreeningMark?: number,
  assessmentMark?: number,
) {
  if (!prescreeningMark && !assessmentMark) {
    throw new Error(
      'One of prescreeningMark or assessmentMark must be provided',
    );
  }
  const mark = prescreeningMark ? { prescreeningMark } : { assessmentMark };

  return db.transaction(async tx => {
    try {
      await tx
        .update(opportunitiesToCandidates)
        .set(mark)
        .where(
          and(
            eq(opportunitiesToCandidates.candidateId, candidateId),
            eq(opportunitiesToCandidates.opportunityId, opportunityId),
          ),
        );

      await tx.insert(userAnswers).values(answers);
    } catch (error) {
      logger.error(error);
      tx.rollback();
      throw error;
    }
  });
}

export async function insertAssessmentMark(
  candidateId: number,
  opportunityId: number,
  assessmentMark: number,
  step: number,
) {
  return db
    .update(opportunitiesToCandidates)
    .set({ step, assessmentMark })
    .where(
      and(
        eq(opportunitiesToCandidates.candidateId, candidateId),
        eq(opportunitiesToCandidates.opportunityId, opportunityId),
      ),
    );
}
