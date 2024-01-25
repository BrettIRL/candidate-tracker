import { NextResponse } from 'next/server';
import {
  getQuestionsById,
  insertAnswersWithTransaction,
} from '@/db/repositories/assessments';
import { NewUserAnswer } from '@/db/schema/assessment';
import { logger } from '@/lib/logger';
import { EvaluationQuestion } from '@/ts/types';

interface PrescreeningEvaluationData {
  candidateId: string;
  opportunityId: string;
  answers: { [questionId: string]: number };
}

export async function POST(req: Request) {
  const data: PrescreeningEvaluationData = await req.json();
  const questionIds = Object.keys(data.answers).map(Number);

  if (questionIds.length <= 0) {
    return NextResponse.json(
      { message: 'No questions submitted' },
      { status: 400 },
    );
  }

  try {
    const questions = (await getQuestionsById(
      questionIds,
    )) as EvaluationQuestion[];

    const [mark, overall] = questions.reduce(
      ([accMark, accOverall], question) => {
        let highestWeight = 0;

        question.answers.forEach(answer => {
          if (data.answers[question.id] === answer.id) {
            accMark += answer.weight;
          }
          if (answer.weight > highestWeight) {
            highestWeight = answer.weight;
          }
        });

        accOverall += highestWeight;

        return [accMark, accOverall];
      },
      [0, 0],
    );

    const percentage = Math.ceil((mark / overall) * 100);
    const answersToSave: NewUserAnswer[] = Object.entries(data.answers).map(
      ([questionId, answerId]) => ({
        candidateId: +data.candidateId,
        opportunityId: +data.opportunityId,
        questionId: +questionId,
        answerId: answerId,
      }),
    );

    await insertAnswersWithTransaction(
      +data.candidateId,
      +data.opportunityId,
      answersToSave,
      percentage,
    );

    if (percentage >= +process.env.NEXT_PUBLIC_PASS_PERCENTAGE!) {
      return NextResponse.json({ redirectUrl: '/assess' });
    }

    return NextResponse.json({ redirectUrl: '/complete' });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error evaluating prescreening answers' },
      { status: 422 },
    );
  }
}
