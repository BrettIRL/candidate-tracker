import { eq } from 'drizzle-orm';
import { opportunities } from '../schema/opportunities';
import type { Candidate, NewCandidate } from '@/db/schema/candidates';
import { candidates, opportunitiesToCandidates } from '@/db/schema/candidates';
import { db } from '@/lib/db';

export async function getCandidates(): Promise<Candidate[]> {
  return db.select().from(candidates);
}

export async function getCandidatesForOpportunity(opportunityId: number) {
  return db
    .select()
    .from(opportunitiesToCandidates)
    .innerJoin(
      candidates,
      eq(opportunitiesToCandidates.candidateId, candidates.id),
    )
    .innerJoin(
      opportunities,
      eq(opportunitiesToCandidates.opportunityId, opportunities.id),
    )
    .where(eq(opportunities.id, opportunityId));
}

export async function createOrUpdateCandidate(candidate: NewCandidate) {
  return db
    .insert(candidates)
    .values(candidate)
    .onConflictDoUpdate({
      target: candidates.idNumber,
      set: { ...candidate, updatedAt: new Date() },
    });
}
