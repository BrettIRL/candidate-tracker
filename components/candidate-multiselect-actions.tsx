import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { ConfirmationAlertDialog } from './confirmation-alert-dialog';
import { addAmbassadors } from '@/actions/ambassadors';
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
import { useCandidateContext } from '@/contexts/CandidateContext';
import { candidateSteps } from '@/lib/mappings';
import { JoinedCandidateOpportunity } from '@/ts/types';

async function changeStep(
  candidateIds: number[],
  opportunityId: number,
  step: number,
): Promise<{ success: boolean }> {
  try {
    const response = await fetch('/api/candidates', {
      method: 'PATCH',
      body: JSON.stringify({ candidateIds, opportunityId, step }),
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
    return { success: true };
  } catch (error) {
    toast({
      title: 'Error changing step',
      description: 'Error changing step. Please try again.',
      variant: 'destructive',
    });
    return { success: false };
  }
}

interface CandidateMultiSelectActionsProps<TData> {
  step: number;
  table: Table<TData>;
}

export function CandidateMultiSelectActions<TData>({
  step,
  table,
}: CandidateMultiSelectActionsProps<TData>) {
  const [showAmbassadorDialog, setShowAmbassadorDialog] =
    useState<boolean>(false);
  const [isAmbassadorLoading, setIsAmbassadorLoading] =
    useState<boolean>(false);

  const { refreshCandidates } = useCandidateContext();

  const handleStepChange = async (step: string) => {
    const selectedCandidates = table
      .getSelectedRowModel()
      .rows.map(row => row.original as JoinedCandidateOpportunity);
    const candidateIds = selectedCandidates.map(
      candidate => candidate.candidates.id,
    );

    const result = await changeStep(
      candidateIds,
      selectedCandidates[0].opportunities.id,
      +step,
    );

    if (result.success) {
      refreshCandidates('' + selectedCandidates[0].opportunities.id);
      table.resetRowSelection();
    }
  };

  const handleAmbassadorChange = async () => {
    setIsAmbassadorLoading(true);

    const selectedCandidates = table
      .getSelectedRowModel()
      .rows.map(row => (row.original as JoinedCandidateOpportunity).candidates);
    const result = await addAmbassadors(selectedCandidates);

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Ambassador has been successfully added',
      });
    } else {
      toast({
        title: 'Error adding ambassador',
        description:
          'There was a problem adding the ambassador. Please try again.',
        variant: 'destructive',
      });
    }

    setIsAmbassadorLoading(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <Icons.multiselect className="mr-2 h-4 w-4" />
            {table.getSelectedRowModel().rows.length} Candidates
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setShowAmbassadorDialog(true)}>
            Make Ambassadors
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={'' + step}
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
      <ConfirmationAlertDialog
        title="Are you sure you want to make these candidates ambassadors?"
        description="Ambassadors are excluded from future opportunities."
        open={showAmbassadorDialog}
        loading={isAmbassadorLoading}
        onOpenChange={setShowAmbassadorDialog}
        onAction={handleAmbassadorChange}
      />
    </>
  );
}
