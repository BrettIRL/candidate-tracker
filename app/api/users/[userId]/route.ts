import { NextResponse } from 'next/server';
import { deleteUser, updateUser } from '@/db/repositories/users';
import { logger } from '@/lib/logger';

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } },
) {
  const userId = params.userId;

  if (!userId) {
    return NextResponse.json(
      { message: 'User id is missing.' },
      { status: 400 },
    );
  }

  try {
    await deleteUser(userId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error deleting user from database' },
      { status: 422 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } },
) {
  const userId = params.userId;
  const data = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: 'User id is missing' },
      { status: 400 },
    );
  }

  try {
    const user = await updateUser(userId, data);
    return NextResponse.json({ ...user }, { status: 200 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error updating user in database' },
      { status: 422 },
    );
  }
}
