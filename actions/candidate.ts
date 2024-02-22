'use server';

import { getCandidatePrescreeningAnswers } from '@/db/repositories/assessments';
import { logger } from '@/lib/logger';

export async function fetchCandidatePrescreeningAnswers(
  candidateId: number,
  opportunityId: number,
) {
  try {
    const data = await getCandidatePrescreeningAnswers(
      candidateId,
      opportunityId,
    );
    return { success: true, data: data[0] };
  } catch (error) {
    logger.error(error);
    return { success: false, error };
  }
}
