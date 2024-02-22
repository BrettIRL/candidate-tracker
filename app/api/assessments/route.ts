import { NextResponse } from 'next/server';
import {
  getQuestionsById,
  insertAssessmentMark,
} from '@/db/repositories/assessments';
import { logger } from '@/lib/logger';
import type { EvaluationQuestion } from '@/ts/types';

interface AssessmentEvaluationData {
  candidateId: string;
  opportunityId: string;
  answers: { [questionId: string]: number };
}

export async function POST(req: Request) {
  const data: AssessmentEvaluationData = await req.json();
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
    const passPercentage = +(process.env.ASSESS_PASS_PERCENTAGE || 70);
    const step = percentage >= passPercentage ? 3 : 2;
    await insertAssessmentMark(
      +data.candidateId,
      +data.opportunityId,
      percentage,
      step,
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error evaluating assessment answers' },
      { status: 422 },
    );
  }
}
