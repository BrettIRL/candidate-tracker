'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';

async function getCandidate(idNumber: string, opportunityId: string) {
  try {
    const response = await fetch(
      `/api/candidates/${opportunityId}/${idNumber}`,
    );

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to retrieve candidate for opportunity. Status: ${response.status}. ${error.message}`,
      );
    }

    return await response.json();
  } catch (error) {
    toast({
      title: 'Error Finding Candidate',
      description:
        'Could not find candidate with that ID number for that opportunity.',
      variant: 'destructive',
    });
    return undefined;
  }
}

const evaluateAssessmentAnswers = async (
  candidateId: string,
  opportunityId: string,
  answers: Record<number, number>,
) => {
  try {
    const response = await fetch('/api/assessments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidateId, opportunityId, answers }),
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to evaluate answers. Status: ${response.status}. ${error.message}`,
      );
    }

    return { success: true };
  } catch (error) {
    toast({
      title: 'Problem evaluating answers',
      description: 'There was a problem evaluating answers. Please try again',
      variant: 'destructive',
    });
    return { success: false };
  }
};

const evaluatePrescreeningAnswers = async (
  candidateId: string,
  opportunityId: string,
  answers: Record<number, number>,
) => {
  try {
    const response = await fetch('/api/assessments/prescreening', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidateId, opportunityId, answers }),
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to evaluate answers. Status: ${response.status}. ${error.message}`,
      );
    }

    const { redirectUrl } = await response.json();
    return { success: true, redirectUrl };
  } catch (error) {
    toast({
      title: 'Problem evaluating answers',
      description: 'There was a problem evaluating answers. Please try again',
      variant: 'destructive',
    });

    return { success: false };
  }
};

interface AssessmentContextState {
  state: {
    candidateId: string | undefined;
    isLoading: boolean;
    overviewViewed: boolean;
    redirectUrl: string | undefined;
    submitted: boolean;
  };
  evaluateAssessment: (
    opportunityId: string,
    answers: Record<number, number>,
  ) => Promise<void>;
  evaluatePrescreening: (
    opportunityId: string,
    answers: Record<number, number>,
  ) => Promise<void>;
  fetchCandidate: (candidateId: string, opportunityId: string) => void;
  setOverviewViewed: (overviewViewed: boolean) => void;
}

const AssessmentContext = createContext<AssessmentContextState | undefined>(
  undefined,
);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AssessmentContextState['state']>({
    candidateId: undefined,
    isLoading: false,
    overviewViewed: false,
    redirectUrl: undefined,
    submitted: false,
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

  const fetchCandidate = async (idNumber: string, opportunityId: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    const candidate = await getCandidate(idNumber, opportunityId);

    if (!candidate) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    if (candidate.step !== 1) {
      toast({
        title: 'Ineligible Candidate',
        description: 'Candidate is not eligible for this assessment',
        variant: 'destructive',
      });
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    let redirectUrl: string | undefined = undefined;
    const passPercentage = Number(process.env.NEXT_PUBLIC_PASS_PERCENTAGE);

    if (!isNaN(passPercentage) && candidate.prescreeningMark) {
      redirectUrl =
        candidate.prescreeningMark >= passPercentage ? '/assess' : '/complete';
    }

    setState(prev => ({
      ...prev,
      candidateId: candidate.candidateId,
      redirectUrl,
      submitted: !!candidate.assessmentMark,
      isLoading: false,
    }));
  };

  const setOverviewViewed = (overviewViewed: boolean) => {
    setState(prev => ({ ...prev, overviewViewed }));
    localStorage.setItem('ct.overviewViewed', JSON.stringify(overviewViewed));
  };

  const evaluatePrescreening = async (
    opportunityId: string,
    answers: Record<number, number>,
  ) => {
    setState(prev => ({ ...prev, isLoading: true }));
    const response = await evaluatePrescreeningAnswers(
      state.candidateId!,
      opportunityId,
      answers,
    );

    if (response.success) {
      setState(prev => ({ ...prev, redirectUrl: response.redirectUrl }));
    }

    setState(prev => ({ ...prev, isLoading: false }));
  };

  const evaluateAssessment = async (
    opportunityId: string,
    answers: Record<number, number>,
  ) => {
    setState(prev => ({ ...prev, isLoading: true }));
    const response = await evaluateAssessmentAnswers(
      state.candidateId!,
      opportunityId,
      answers,
    );

    if (response.success) {
      setState(prev => ({ ...prev, submitted: true }));
    }
    setState(prev => ({ ...prev, isLoading: false }));
  };

  return (
    <AssessmentContext.Provider
      value={{
        state,
        evaluateAssessment,
        evaluatePrescreening,
        fetchCandidate,
        setOverviewViewed,
      }}
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
