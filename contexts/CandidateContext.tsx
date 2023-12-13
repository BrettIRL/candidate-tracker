'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';
import type { JoinedCandidateOpportunity } from '@/ts/types';

async function fetchCandidatesForOpportunity(
  opportunityId: string,
): Promise<{ [step: number]: JoinedCandidateOpportunity[] }> {
  try {
    const response = await fetch(`/api/candidates/${opportunityId}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to fetch candidates. Status: ${response.status}. ${result.message}`,
      );
    }

    return result.data;
  } catch (error) {
    toast({
      title: 'Error fetching candidates',
      description: 'Error fetching candidates. Please try again.',
      variant: 'destructive',
    });
    return { 0: [] };
  }
}

interface CandidateContextState {
  data: { [step: number]: JoinedCandidateOpportunity[] };
  refresh: (opportunityId: string) => void;
}

const CandidateContext = createContext<CandidateContextState | undefined>(
  undefined,
);

export function CandidateProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<{
    [step: number]: JoinedCandidateOpportunity[];
  }>([]);

  const refresh = async (opportunityId: string) => {
    const data = await fetchCandidatesForOpportunity(opportunityId);
    setData(data);
  };

  return (
    <CandidateContext.Provider value={{ data, refresh }}>
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidateContext() {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error(
      'useCandidateContext must be used within a CandidateProvider',
    );
  }
  return context;
}
