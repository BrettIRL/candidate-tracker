import { and, eq, sql } from 'drizzle-orm';
import { opportunities } from '../schema/opportunities';
import type {
  Candidate,
  NewCandidate,
  NewOpportunityToCandidate,
} from '@/db/schema/candidates';
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

export async function getOpportunityCandidateByIdNumber(
  opportunityId: number,
  idNumber: string,
) {
  return db
    .select()
    .from(candidates)
    .innerJoin(
      opportunitiesToCandidates,
      and(
        eq(opportunitiesToCandidates.opportunityId, opportunityId),
        eq(opportunitiesToCandidates.candidateId, candidates.id),
      ),
    )
    .innerJoin(
      opportunities,
      eq(opportunities.id, opportunitiesToCandidates.opportunityId),
    )
    .where(eq(candidates.idNumber, idNumber));
}

export async function createOrUpdateCandidates(newCandidates: NewCandidate[]) {
  return db
    .insert(candidates)
    .values(newCandidates)
    .onConflictDoUpdate({
      target: candidates.idNumber,
      set: {
        lastName: sql`EXCLUDED.last_name`,
        age: sql`EXCLUDED.age`,
        disability: sql`EXCLUDED.disability`,
        phone: sql`EXCLUDED.phone`,
        suburb: sql`EXCLUDED.suburb`,
        city: sql`EXCLUDED.city`,
        province: sql`EXCLUDED.province`,
        postalCode: sql`EXCLUDED.postal_code`,
        hasLicense: sql`EXCLUDED.has_license`,
        hasMatric: sql`EXCLUDED.has_matric`,
        updatedAt: new Date(),
      },
    })
    .returning();
}

export async function linkCandidatesToOpportunity(
  data: Omit<NewOpportunityToCandidate, 'step' | 'createdAt' | 'updatedAt'>[],
) {
  return db
    .insert(opportunitiesToCandidates)
    .values(data)
    .onConflictDoNothing({
      target: [
        opportunitiesToCandidates.opportunityId,
        opportunitiesToCandidates.candidateId,
      ],
    });
}

export async function changeStep(
  candidateId: number,
  opportunityId: number,
  step: number,
) {
  return db
    .update(opportunitiesToCandidates)
    .set({ step })
    .where(
      and(
        eq(opportunitiesToCandidates.candidateId, candidateId),
        eq(opportunitiesToCandidates.opportunityId, opportunityId),
      ),
    );
}
