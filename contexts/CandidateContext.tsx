'use client';

import { useParams } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
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
  refreshCandidates: (opportunityId: string) => void;
}

const CandidateContext = createContext<CandidateContextState | undefined>(
  undefined,
);

export function CandidateProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<{
    [step: number]: JoinedCandidateOpportunity[];
  }>([]);
  const { opportunityId }: { opportunityId: string } = useParams();

  const fetchCandidates = useCallback(async () => {
    if (!opportunityId) return;
    setData([]);
    const data = await fetchCandidatesForOpportunity(opportunityId);
    setData(data);
  }, [opportunityId]);

  const refreshCandidates = useCallback(async (opportunity: string) => {
    const data = await fetchCandidatesForOpportunity(opportunity);
    setData(data);
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  return (
    <CandidateContext.Provider value={{ data, refreshCandidates }}>
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
