import { NextResponse } from 'next/server';
import { getSettings, updateSetting } from '@/db/repositories/settings';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json({ settings }, { status: 200 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error retrieving settings' },
      { status: 422 },
    );
  }
}

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
