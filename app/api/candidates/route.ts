import { NextResponse } from 'next/server';
import { changeStep } from '@/db/repositories/candidates';
import { logger } from '@/lib/logger';

export async function PATCH(req: Request) {
  const { candidateId, opportunityId, step } = await req.json();

  if (!candidateId || !opportunityId || step === undefined) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    );
  }

  try {
    await changeStep(candidateId, opportunityId, step);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error changing candidate step' },
      { status: 422 },
    );
  }
}
