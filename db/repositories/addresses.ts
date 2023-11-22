import type { Address, NewAddress } from '@/db/schema/addresses';
import { addresses } from '@/db/schema/addresses';
import { db } from '@/lib/db';

export async function getAddresses(): Promise<Address[]> {
  return db.select().from(addresses);
}

export async function insertAddress(address: NewAddress): Promise<Address[]> {
  return db.insert(addresses).values(address).returning();
}
