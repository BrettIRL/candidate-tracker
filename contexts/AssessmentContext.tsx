'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface AssessmentContextState {
  state: {
    candidateId: string | undefined;
    overviewViewed: boolean;
  };
  setCandidateId: (candidateId: string) => void;
  setOverviewViewed: (overviewViewed: boolean) => void;
}

const AssessmentContext = createContext<AssessmentContextState | undefined>(
  undefined,
);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentContextState['state']>({
    candidateId: undefined,
    overviewViewed: false,
  });

  useEffect(() => {
    const overviewViewed = localStorage.getItem('ct.overviewViewed');
    if (overviewViewed) {
      setState(prev => ({
        ...prev,
        overviewViewed: JSON.parse(overviewViewed),
      }));
    }
  }, []);

  const setCandidateId = (candidateId: string) => {
    setState(prev => ({ ...prev, candidateId }));
  };

  const setOverviewViewed = (overviewViewed: boolean) => {
    setState(prev => ({ ...prev, overviewViewed }));
    localStorage.setItem('ct.overviewViewed', JSON.stringify(overviewViewed));
  };

  return (
    <AssessmentContext.Provider
      value={{ state, setCandidateId, setOverviewViewed }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessmentContext() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error(
      'useAssessmentContext must be used within a AssessmentProvider',
    );
  }
  return context;
}
