'use client';

import { useAssessmentContext } from '@/contexts/AssessmentContext';
import { useAssessmentGatekeeper } from '@/hooks/useAssessmentGatekeeper';

export default function AssessmentOverviewPage() {
  const context = useAssessmentContext();
  useAssessmentGatekeeper();

  return (
    <button onClick={() => context.setOverviewViewed(true)}>Continue</button>
  );
}
