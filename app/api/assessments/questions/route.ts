import { NextResponse } from 'next/server';
import {
  getQuestionsAndAnswers,
  insertQuestion,
} from '@/db/repositories/assessments';
import { logger } from '@/lib/logger';
import { shuffleArray } from '@/lib/utils';
import type { AssessmentQuestion, QuestionsByCategory } from '@/ts/types';

export async function GET() {
  const minQPerCategory = Number(process.env.ASSESS_MIN_CAT_QUEST) || 2;
  const percentOfQuestions =
    Number(process.env.ASSESS_PERC_TOTAL_QUEST) || 0.75;

  try {
    const questions = (await getQuestionsAndAnswers()) as AssessmentQuestion[];
    const randomizedQuestions: Set<AssessmentQuestion> = new Set();
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

    for (const questions of Object.values(byCategory)) {
      shuffleArray(questions);
      for (let i = 0; Math.min(minQPerCategory, questions.length) > i; i++) {
        randomizedQuestions.add(questions[i]);
      }
    }

    const remainingQuestionPool = questions.filter(
      q => !randomizedQuestions.has(q),
    );
    shuffleArray(remainingQuestionPool);
    remainingQuestionPool
      .slice(
        0,
        Math.floor(questions.length * percentOfQuestions) -
          randomizedQuestions.size,
      )
      .forEach(q => randomizedQuestions.add(q));

    const selectedQuestions: QuestionsByCategory = Array.from(
      randomizedQuestions,
    ).reduce((acc: QuestionsByCategory, question) => {
      acc[question.category] = acc[question.category] || [];
      acc[question.category].push(question);
      return acc;
    }, {});

    return NextResponse.json(selectedQuestions, { status: 200 });
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
