'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useCandidateContext } from '@/contexts/CandidateContext';

async function importCandidates(opportunityId: string) {
  try {
    const response = await fetch(
      '/api/candidates/import?opportunityId=' + opportunityId,
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        `Error fetching candidates from SA Youth. Status: ${response.status}. ${data.message}`,
      );
    }

    return true;
  } catch (error) {
    toast({
      title: 'Error fetching candidates',
      description: 'Error fetching candidates from SA Youth. Please try again',
      variant: 'destructive',
    });
    return false;
  }
}

interface CandidateImportButtonProps {
  opportunityId: string;
}

export function CandidateImportButton({
  opportunityId,
}: CandidateImportButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false);
  const { refreshCandidates } = useCandidateContext();

  const handleClick = async () => {
    setIsLoading(true);

    const result = await importCandidates(opportunityId);

    if (result) {
      refreshCandidates(opportunityId);
      // TODO: Save timeout to localstorage
      setIsTimedOut(true);
      setTimeout(() => {
        setIsTimedOut(false);
      }, 60000);
    }

    setIsLoading(false);
  };

  return (
    <Button onClick={handleClick} disabled={isLoading || isTimedOut}>
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      Import Candidates
    </Button>
  );
}
