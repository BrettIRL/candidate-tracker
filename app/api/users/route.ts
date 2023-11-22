import { randomUUID } from 'crypto';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { insertUser } from '@/db/repositories/users';
import { logger } from '@/lib/logger';

interface UserRequestData {
  email?: string;
  name?: string;
  password?: string;
}

export async function POST(req: Request) {
  const { email, name, password }: UserRequestData = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json(
      { message: 'Required fields are missing.' },
      { status: 400 },
    );
  }

  try {
    const id = randomUUID();
    const hashedPassword = await hash(password, 10);
    const user = await insertUser({
      id,
      email,
      name,
      password: hashedPassword,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error saving user to database' },
      { status: 422 },
    );
  }
}
