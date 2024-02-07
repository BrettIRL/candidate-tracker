import { eq } from 'drizzle-orm';
import {
  type NewCategory,
  categories,
  questions,
  answers,
  type NewAnswer,
  type NewQuestion,
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

export async function getQuestions() {
  return db
    .select({
      id: questions.id,
      question: questions.question,
      category: categories.name,
      preScreening: questions.preScreening,
      multipleAnswers: questions.multipleAnswers,
    })
    .from(questions)
    .innerJoin(categories, eq(questions.category, categories.id));
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
