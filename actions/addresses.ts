'use server';

import { deleteAddressById } from '@/db/repositories/addresses';
import { logger } from '@/lib/logger';

export async function deleteAddress(addressId: number) {
  try {
    await deleteAddressById(addressId);
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}
