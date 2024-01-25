import { NextRequest, NextResponse } from 'next/server';
import { getOpportunityCandidateByIdNumber } from '@/db/repositories/candidates';
import { logger } from '@/lib/logger';

export async function GET(
  req: NextRequest,
  { params }: { params: { opportunityId: string; idNumber: string } },
) {
  try {
    const data = await getOpportunityCandidateByIdNumber(
      +params.opportunityId,
      params.idNumber,
    );

    return NextResponse.json({
      ...data[0]['opportunities_to_candidates'],
      candidate: data[0]['candidates'],
      opportunity: data[0]['opportunities'],
    });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      {
        message: 'Error fetching specified candidate for specified opportunity',
      },
      { status: 422 },
    );
  }
}
