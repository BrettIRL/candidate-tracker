import { eq } from 'drizzle-orm';
import { ambassadors } from '@/db/schema/ambassadors';
import { db } from '@/lib/db';

export async function deleteAmbassadorById(id: number) {
  return db.delete(ambassadors).where(eq(ambassadors.id, id));
}

export async function getAmbassadors() {
  return db.select().from(ambassadors);
}
