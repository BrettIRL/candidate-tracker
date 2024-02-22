'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Opportunity } from '@/db/schema/opportunities';

interface OpportunityContextState {
  templateOpportunity: Opportunity | undefined;
  setTemplateOpportunity: (opportunity: Opportunity) => void;
}

const OpportunityContext = createContext<OpportunityContextState | undefined>(
  undefined,
);

export function OpportunityProvider({ children }: { children: ReactNode }) {
  const [templateOpportunity, setTemplateOpportunity] = useState<
    Opportunity | undefined
  >(undefined);

  return (
    <OpportunityContext.Provider
      value={{ templateOpportunity, setTemplateOpportunity }}
    >
      {children}
    </OpportunityContext.Provider>
  );
}

export function useOpportunityContext() {
  const context = useContext(OpportunityContext);
  if (context === undefined) {
    throw new Error(
      'useOpportunityContext must be used within a CandidateProvider',
    );
  }
  return context;
}
