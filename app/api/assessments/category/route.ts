import { NextResponse } from 'next/server';
import { getCategories, insertCategory } from '@/db/repositories/assessments';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const categories = await getCategories();

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error fetching categories from database' },
      { status: 422 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const category = await insertCategory({ name });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error creating category' },
      { status: 422 },
    );
  }
}
