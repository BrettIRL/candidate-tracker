'use client';

import { VisibilityState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { CandidateStepSelector } from '@/components/candidate-step-selector';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { CandidateImportButton } from '@/components/ui/candidate-import-button';
import { useCandidateContext } from '@/contexts/CandidateContext';

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
  const candidateContext = useCandidateContext();

  useEffect(() => {
    candidateContext?.refresh(params.opportunityId);
  }, [params.opportunityId, candidateContext]);

  const handleStepChange = (step: number) => {
    let columns = {};
    switch (step) {
      case 0:
        columns = { assessment: false, step: false };
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
          candidateContext.data[0]?.length
            ? candidateContext.data[0][0].opportunities.title
            : 'Manage Candidates'
        }
      >
        <CandidateImportButton opportunityId={params.opportunityId} />
      </DashboardHeader>
      <CandidateStepSelector onStepChange={handleStepChange} />
      <DataTable
        data={candidateContext.data[step] || []}
        columns={columns}
        initialState={{ columnVisibility: visibleColumns }}
        filterColumn="name"
        visibleColumns={visibleColumns}
      />
    </div>
  );
}
