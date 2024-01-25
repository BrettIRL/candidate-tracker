import { NextResponse } from 'next/server';
import { getPrescreeningQuestions } from '@/db/repositories/assessments';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const questions = await getPrescreeningQuestions();

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error fetching questions' },
      { status: 422 },
    );
  }
}
