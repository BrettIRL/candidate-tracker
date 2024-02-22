'use server';

import {
  deleteAmbassadorById,
  insertAmbassadors,
} from '@/db/repositories/ambassadors';
import { NewAmbassador } from '@/db/schema/ambassadors';
import type { Candidate } from '@/db/schema/candidates';
import { logger } from '@/lib/logger';

export async function addAmbassadors(candidates: Candidate[]) {
  try {
    const newAmbassadors: NewAmbassador[] = candidates.map(
      ({ firstName, lastName, idNumber }) => ({
        firstName,
        lastName,
        idNumber,
      }),
    );
    await insertAmbassadors(newAmbassadors);
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false, error };
  }
}

export async function deleteAmbassador(ambassadorId: number) {
  try {
    await deleteAmbassadorById(ambassadorId);
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false, error };
  }
}
