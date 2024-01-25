'use client';

import { CandidateIdInput } from '@/components/candidate-id-input';
import { useAssessmentContext } from '@/contexts/AssessmentContext';
import { useAssessmentGatekeeper } from '@/hooks/useAssessmentGatekeeper';

interface CandidateAssessmentProps {
  params: {
    opportunityId: string;
  };
}

export default function CandidateAssessmentPage({
  params,
}: CandidateAssessmentProps) {
  const context = useAssessmentContext();
  useAssessmentGatekeeper();

  const handleIdChange = (candidateId: string) => {
    context.fetchCandidate(candidateId, params.opportunityId);
  };

  return (
    <CandidateIdInput
      isLoading={context.state.isLoading}
      onChange={handleIdChange}
    />
  );
}
