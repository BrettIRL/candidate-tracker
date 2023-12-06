import type { Candidate, OpportunityToCandidate } from '@/db/schema/candidates';
import type { Opportunity } from '@/db/schema/opportunities';

export type JoinedCandidateOpportunity = {
  candidates: Candidate;
  opportunities: Opportunity;
  opportunities_to_candidates: OpportunityToCandidate;
};
