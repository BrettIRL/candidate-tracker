import { NextResponse } from 'next/server';
import {
  getQuestionsAndAnswers,
  insertQuestion,
} from '@/db/repositories/assessments';
import { logger } from '@/lib/logger';
import type { AssessmentQuestion, QuestionsByCategory } from '@/ts/types';

export async function GET() {
  try {
    const questions = (await getQuestionsAndAnswers()) as AssessmentQuestion[];
    const byCategory = questions.reduce(
      (acc: QuestionsByCategory, question) => {
        if (!acc[question.category]) {
          acc[question.category] = [];
        }
        acc[question.category].push(question);
        return acc;
      },
      {},
    );

    return NextResponse.json(byCategory, { status: 200 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error fetching questions' },
      { status: 422 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const question = await insertQuestion(
      {
        question: data.question,
        category: data.category,
        preScreening: data.preScreening,
      },
      data.answers,
    );

    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error creating question' },
      { status: 422 },
    );
  }
}
