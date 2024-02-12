import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAssessmentContext } from '@/contexts/AssessmentContext';

export function useAssessmentGatekeeper() {
  const context = useAssessmentContext();
  const { opportunityId }: { opportunityId: string } = useParams();
  const router = useRouter();

  useEffect(() => {
    const getPath = () => {
      const basePath = '/assessment/' + opportunityId;

      if (!context.state.candidateId) {
        return basePath;
      }

      if (context.state.submitted) {
        return basePath + '/complete';
      }

      if (context.state.redirectUrl) {
        return basePath + context.state.redirectUrl;
      }

      return context.state.overviewViewed
        ? basePath + '/prescreening'
        : basePath + '/overview';
    };

    const route = getPath();
    router.push(route);
  }, [
    context.state.candidateId,
    context.state.overviewViewed,
    context.state.redirectUrl,
    context.state.submitted,
    router,
    opportunityId,
  ]);
}
