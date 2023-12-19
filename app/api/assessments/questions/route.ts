import { NextResponse } from 'next/server';
import { insertQuestion } from '@/db/repositories/assessments';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const question = await insertQuestion(
      {
        question: data.question,
        category: data.category,
        multipleAnswers: data.multipleAnswers,
      },
      data.answers,
    );

    return NextResponse.json({ question }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating question' },
      { status: 422 },
    );
  }
}
