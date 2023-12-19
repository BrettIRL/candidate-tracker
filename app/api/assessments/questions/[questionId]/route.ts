import { NextResponse } from 'next/server';
import { deleteQuestion } from '@/db/repositories/assessments';
import { logger } from '@/lib/logger';

export async function DELETE(
  req: Request,
  { params }: { params: { questionId: string } },
) {
  if (!params.questionId) {
    return NextResponse.json(
      { message: 'Missing required parameters' },
      { status: 400 },
    );
  }

  try {
    await deleteQuestion(+params.questionId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error deleting question' },
      { status: 422 },
    );
  }
}
