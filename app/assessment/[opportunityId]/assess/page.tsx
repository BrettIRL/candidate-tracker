'use client';

import { CandidateAssessment } from '@/components/candidate-assessment';
import { useAssessmentContext } from '@/contexts/AssessmentContext';
import { useAssessmentGatekeeper } from '@/hooks/useAssessmentGatekeeper';

interface AssessmentPageProps {
  params: {
    opportunityId: string;
  };
}

export default function AssessmentPage({ params }: AssessmentPageProps) {
  const context = useAssessmentContext();
  useAssessmentGatekeeper();

  const handleSubmit = (answers: Record<number, number>) => {
    if (context.state.candidateId) {
      context.evaluateAssessment(params.opportunityId, answers);
    }
  };

  return (
    <CandidateAssessment
      isLoading={context.state.isLoading}
      onSubmit={handleSubmit}
    />
  );
}
