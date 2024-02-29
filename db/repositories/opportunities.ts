import { eq } from 'drizzle-orm';
import {
  opportunities,
  statusEnum,
  type NewOpportunity,
  type Opportunity,
} from '@/db/schema/opportunities';
import { db } from '@/lib/db';
import { logger } from '@/lib/logger';

export async function getOpportunities(): Promise<Opportunity[]> {
  return db.select().from(opportunities);
}

export async function getOpportunityById(opportunityId: number) {
  return db
    .select()
    .from(opportunities)
    .where(eq(opportunities.id, opportunityId));
}

export async function insertOpportunityWithTransaction(
  opportunity: Omit<NewOpportunity, 'providerId'>,
  externalRequest: Promise<Response>,
): Promise<Opportunity[]> {
  return db.transaction(async tx => {
    try {
      const inserted = await tx
        .insert(opportunities)
        .values(opportunity)
        .returning();

      const response = await externalRequest;
      const saYouthRes = await response.json();

      if (!response.ok) {
        throw new Error(
          `Error with external request. Status: ${response.status}. ${saYouthRes.errors}`,
        );
      }

      const updated = tx
        .update(opportunities)
        .set({
          providerId: saYouthRes.response.opportunityId,
          providerStatus: saYouthRes.response.opportunityId ? 'active' : null,
        })
        .where(eq(opportunities.id, inserted[0].id))
        .returning();

      return updated;
    } catch (error) {
      logger.error(error);
      tx.rollback();
      return [];
    }
  });
}

export async function updateOpportunityByProviderId(
  providerId: string,
  data: Partial<Opportunity>,
) {
  return db
    .update(opportunities)
    .set(data)
    .where(eq(opportunities.providerId, providerId));
}

export async function changeProviderStatus(
  providerId: string,
  status: (typeof statusEnum.enumValues)[number],
) {
  return db
    .update(opportunities)
    .set({ providerStatus: status })
    .where(eq(opportunities.providerId, providerId));
}
