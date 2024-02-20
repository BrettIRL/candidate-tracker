'use server';

import { deleteAmbassadorById } from '@/db/repositories/ambassadors';
import { logger } from '@/lib/logger';

export async function deleteAmbassador(ambassadorId: number) {
  try {
    await deleteAmbassadorById(ambassadorId);
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false, error };
  }
}
