import type { Row } from '@tanstack/react-table';
import { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { ViewCandidateDialog } from '@/components/view-candidate-dialog';
import { useCandidateContext } from '@/contexts/CandidateContext';
import { candidateSteps } from '@/lib/mappings';
import { JoinedCandidateOpportunity } from '@/ts/types';

async function changeStep(
  candidateId: number,
  opportunityId: number,
  step: number,
): Promise<boolean> {
  try {
    const response = await fetch('/api/candidates', {
      method: 'PATCH',
      body: JSON.stringify({ candidateId, opportunityId, step }),
    });

    if (!response.ok) {
      const result: { message: string } = await response.json();
      throw new Error(
        `Failed to change step. Status: ${response.status}. ${result.message}`,
      );
    }

    toast({
      title: 'Success',
      description: 'Candidate has been successfully moved',
      variant: 'default',
    });
    return true;
  } catch (error) {
    toast({
      title: 'Error changing step',
      description: 'Error changing step. Please try again.',
      variant: 'destructive',
    });
    return false;
  }
}

interface DataTableRowActionsProps {
  row: Row<JoinedCandidateOpportunity>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [showViewCandidateDialog, setShowViewCandidateDialog] =
    useState<boolean>(false);
  const { refreshCandidates } = useCandidateContext();

  const handleStepChange = async (step: string) => {
    const success = await changeStep(
      row.original.candidates.id,
      row.original.opportunities.id,
      +step,
    );

    if (success) {
      refreshCandidates('' + row.original.opportunities.id);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Icons.dotsHorizontal className="h-4 w-4" />
            <span className="sr-only">Open Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setShowViewCandidateDialog(true)}>
            View Candidate
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={'' + row.getValue('step')}
                  onValueChange={handleStepChange}
                >
                  {Object.keys(candidateSteps).map(step => (
                    <DropdownMenuRadioItem key={step} value={step}>
                      {candidateSteps[+step]}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewCandidateDialog
        candidate={row.original.candidates}
        open={showViewCandidateDialog}
        onOpenChange={setShowViewCandidateDialog}
      />
    </>
  );
}
