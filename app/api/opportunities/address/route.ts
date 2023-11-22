import { NextResponse } from 'next/server';
import { getAddresses, insertAddress } from '@/db/repositories/addresses';
import { NewAddress } from '@/db/schema/addresses';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const addresses = await getAddresses();

    return NextResponse.json(addresses, { status: 200 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error fetching addresses from database' },
      { status: 422 },
    );
  }
}

export async function POST(req: Request) {
  const data: NewAddress = await req.json();

  try {
    const address = await insertAddress(data);

    return NextResponse.json({ address }, { status: 201 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error saving address to database' },
      { status: 422 },
    );
  }
}
