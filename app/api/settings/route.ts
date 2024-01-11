import { NextResponse } from 'next/server';
import { updateSetting } from '@/db/repositories/settings';
import { logger } from '@/lib/logger';

export async function PATCH(req: Request) {
  const { name, value } = await req.json();

  if (!name || !value) {
    return NextResponse.json(
      { message: 'Required fields are missing.' },
      { status: 400 },
    );
  }

  try {
    await updateSetting(name, value);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error saving setting' },
      { status: 422 },
    );
  }
}
