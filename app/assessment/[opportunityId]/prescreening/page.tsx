'use client';

import { CandidatePrescreening } from '@/components/candidate-prescreening';
import { useAssessmentContext } from '@/contexts/AssessmentContext';
import { useAssessmentGatekeeper } from '@/hooks/useAssessmentGatekeeper';

interface PrescreeningPageProps {
  params: {
    opportunityId: string;
  };
}

export default function PrescreeningPage({ params }: PrescreeningPageProps) {
  const context = useAssessmentContext();
  useAssessmentGatekeeper();

  const handleSubmit = (answers: Record<number, number>) => {
    if (context.state.candidateId) {
      context.evaluatePrescreening(params.opportunityId, answers);
    }
  };

  return (
    <CandidatePrescreening
      isLoading={context.state.isLoading}
      onSubmit={handleSubmit}
    />
  );
}
