import { eq, inArray } from 'drizzle-orm';
import { ambassadors } from '@/db/schema/ambassadors';
import { db } from '@/lib/db';

export async function deleteAmbassadorById(id: number) {
  return db.delete(ambassadors).where(eq(ambassadors.id, id));
}

export async function getAmbassadors() {
  return db.select().from(ambassadors);
}

export async function getAmbassadorsByIdNumbers(
  idNumbers: string[],
): Promise<Set<string>> {
  const result = await db
    .select({ idNumber: ambassadors.idNumber })
    .from(ambassadors)
    .where(inArray(ambassadors.idNumber, idNumbers));

  return new Set(result.map(row => row.idNumber));
}
