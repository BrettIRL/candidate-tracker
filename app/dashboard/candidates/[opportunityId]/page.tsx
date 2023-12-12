'use client';

import { VisibilityState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { CandidateStepSelector } from '@/components/candidate-step-selector';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { CandidateImportButton } from '@/components/ui/candidate-import-button';
import { toast } from '@/components/ui/use-toast';
import { JoinedCandidateOpportunity } from '@/ts/types';

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

interface OpportunityCandidatesProps {
  params: {
    opportunityId: string;
  };
}

export default function OpportunityCandidates({
  params,
}: OpportunityCandidatesProps) {
  const [step, setStep] = useState<number>(0);
  const [visibleColumns, setVisibleColumns] = useState<VisibilityState>({
    mark: false,
    step: false,
  });
  const [data, setData] = useState<{
    [step: number]: JoinedCandidateOpportunity[];
  }>({ 0: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCandidatesForOpportunity(params.opportunityId);

      setData(data);
    };
    fetchData();
  }, [params.opportunityId]);

  const handleStepChange = (step: number) => {
    let columns = {};
    switch (step) {
      case 0:
        columns = { mark: false, step: false };
        break;
      case 1:
        columns = {
          distance: false,
          rank: false,
          requirements: false,
          step: false,
        };
        break;
    }
    setVisibleColumns(columns);
    setStep(step);
  };

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader
        heading="Candidates"
        text={
          data[0].length ? data[0][0].opportunities.title : 'Manage Candidates'
        }
      >
        <CandidateImportButton opportunityId={params.opportunityId} />
      </DashboardHeader>
      <CandidateStepSelector onStepChange={handleStepChange} />
      <DataTable
        data={data[step] || []}
        columns={columns}
        initialState={{ columnVisibility: visibleColumns }}
        filterColumn="name"
        visibleColumns={visibleColumns}
      />
    </div>
  );
}
