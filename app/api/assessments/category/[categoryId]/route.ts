import { NextResponse } from 'next/server';
import { deleteCategory } from '@/db/repositories/assessments';
import { logger } from '@/lib/logger';

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  if (!params.categoryId) {
    return NextResponse.json(
      { message: 'Missing required data' },
      { status: 400 },
    );
  }

  try {
    await deleteCategory(+params.categoryId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error deleting category' },
      { status: 422 },
    );
  }
}
