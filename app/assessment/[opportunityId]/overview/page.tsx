'use client';

import { CandidateOverview } from '@/components/candidate-overview';
import { useAssessmentContext } from '@/contexts/AssessmentContext';
import { useAssessmentGatekeeper } from '@/hooks/useAssessmentGatekeeper';

export default function AssessmentOverviewPage() {
  const context = useAssessmentContext();
  useAssessmentGatekeeper();

  return <CandidateOverview onClick={() => context.setOverviewViewed(true)} />;
}
