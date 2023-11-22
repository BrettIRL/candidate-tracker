import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { updateUser } from '@/db/repositories/users';
import { logger } from '@/lib/logger';

export async function POST(
  req: Request,
  { params }: { params: { userId: string } },
) {
  const userId = params.userId;
  const { password }: { password: string } = await req.json();

  if (!userId || !password) {
    return NextResponse.json(
      { message: 'Required fields are missing' },
      { status: 400 },
    );
  }

  try {
    const hashedPassword = await hash(password, 10);
    await updateUser(userId, { password: hashedPassword });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error changing password' },
      { status: 422 },
    );
  }
}
