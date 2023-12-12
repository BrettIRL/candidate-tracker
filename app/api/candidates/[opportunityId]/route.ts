import { NextRequest, NextResponse } from 'next/server';
import { getCandidatesForOpportunity } from '@/db/repositories/candidates';
import { logger } from '@/lib/logger';
import type { JoinedCandidateOpportunity } from '@/ts/types';

export async function GET(
  req: NextRequest,
  { params }: { params: { opportunityId: string } },
) {
  try {
    const data = await getCandidatesForOpportunity(+params.opportunityId);
    const stepData = data.reduce(
      (
        steps: { [step: number]: JoinedCandidateOpportunity[] },
        line: JoinedCandidateOpportunity,
      ) => {
        const step = line.opportunities_to_candidates.step;
        if (!steps[step]) {
          steps[step] = [];
        }

        steps[step].push(line);
        return steps;
      },
      {},
    );

    return NextResponse.json({ data: stepData }, { status: 200 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error fetching candidates for specified opportunity' },
      { status: 422 },
    );
  }
}
