import { and, eq, inArray, isNull, sql } from 'drizzle-orm';
import { opportunities } from '../schema/opportunities';
import type {
  Candidate,
  NewCandidate,
  NewOpportunityToCandidate,
  OpportunityToCandidate,
} from '@/db/schema/candidates';
import { candidates, opportunitiesToCandidates } from '@/db/schema/candidates';
import { db } from '@/lib/db';
import { SMSTemplate } from '@/ts/enums';

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

export async function getOpportunityCandidatesById(
  candidateId: number[],
  opportunityId: number,
  timestampKey: keyof OpportunityToCandidate,
) {
  return db
    .select()
    .from(opportunitiesToCandidates)
    .innerJoin(
      candidates,
      eq(opportunitiesToCandidates.candidateId, candidates.id),
    )
    .where(
      and(
        eq(opportunitiesToCandidates.opportunityId, opportunityId),
        inArray(opportunitiesToCandidates.candidateId, candidateId),
        isNull(opportunitiesToCandidates[timestampKey]),
      ),
    );
}

export async function getCandidatesForAssessmentSMS(opportunityId: number) {
  return db
    .select()
    .from(opportunitiesToCandidates)
    .innerJoin(
      candidates,
      eq(opportunitiesToCandidates.candidateId, candidates.id),
    )
    .where(
      and(
        eq(opportunitiesToCandidates.opportunityId, opportunityId),
        eq(opportunitiesToCandidates.step, 1),
        isNull(opportunitiesToCandidates.assessmentSMSSentAt),
      ),
    );
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
  data: Omit<
    NewOpportunityToCandidate,
    'step' | 'assessmentSMSSentAt' | 'createdAt' | 'updatedAt'
  >[],
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

export async function updateOpportunityCandidates(
  candidateIds: number[],
  opportunityId: number,
  data: Partial<NewOpportunityToCandidate>,
) {
  return db
    .update(opportunitiesToCandidates)
    .set(data)
    .where(
      and(
        eq(opportunitiesToCandidates.opportunityId, opportunityId),
        inArray(opportunitiesToCandidates.candidateId, candidateIds),
      ),
    );
}

export async function changeStep(
  candidateIds: number[],
  opportunityId: number,
  step: number,
) {
  return db
    .update(opportunitiesToCandidates)
    .set({ step })
    .where(
      and(
        inArray(opportunitiesToCandidates.candidateId, candidateIds),
        eq(opportunitiesToCandidates.opportunityId, opportunityId),
      ),
    );
}
