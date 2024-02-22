import { Table } from '@tanstack/react-table';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <Icons.gear className="mr-2 h-4 w-4" />
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {/* <DropdownMenuLabel>Toggle columns</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
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
  );
}
