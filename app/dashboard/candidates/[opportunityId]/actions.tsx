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
import { ViewCandidateDialog } from '@/components/view-candidate-dialog';
import { candidateSteps } from '@/lib/mappings';
import { JoinedCandidateOpportunity } from '@/ts/types';

interface DataTableRowActionsProps {
  row: Row<JoinedCandidateOpportunity>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [showViewCandidateDialog, setShowViewCandidateDialog] =
    useState<boolean>(false);

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
                <DropdownMenuRadioGroup value={'' + row.getValue('step')}>
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
