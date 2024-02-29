import type { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icons } from '@/components/icons';
import { OpportunityPauseDialog } from '@/components/opportunity-pause-dialog';
import { OpportunityResumeDialog } from '@/components/opportunity-resume-dialog';
import { OpportunityUrlDialog } from '@/components/opportunity-url-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useOpportunityContext } from '@/contexts/OpportunityContext';
import type { Opportunity } from '@/db/schema/opportunities';

interface DataTableRowActionsProps {
  row: Row<Opportunity>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [showPauseDialog, setShowPauseDialog] = useState<boolean>(false);
  const [showResumeDialog, setShowResumeDialog] = useState<boolean>(false);
  const [showUrlDialog, setShowUrlDialog] = useState<boolean>(false);

  const context = useOpportunityContext();
  const router = useRouter();

  const handleDuplicate = () => {
    context.setTemplateOpportunity(row.original);
    router.push(
      `${process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT}/opportunities/create`,
    );
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
          <DropdownMenuItem
            onSelect={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT}/candidates/${row.original.id}`,
              )
            }
          >
            View Candidates
          </DropdownMenuItem>
          {row.original.providerStatus !== 'paused' ? (
            <DropdownMenuItem onSelect={() => setShowPauseDialog(true)}>
              Pause Opportunity
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onSelect={() => setShowResumeDialog(true)}>
              Resume Opportunity
            </DropdownMenuItem>
          )}
          {row.original.providerId && (
            <DropdownMenuItem onSelect={() => setShowUrlDialog(true)}>
              Get SA Youth URL
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={handleDuplicate}>
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex cursor-pointer items-center text-destructive focus:text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {row.original.providerId && (
        <OpportunityUrlDialog
          providerId={row.original.providerId}
          open={showUrlDialog}
          onOpenChange={setShowUrlDialog}
        />
      )}
      {row.original.providerId && (
        <OpportunityPauseDialog
          providerId={row.original.providerId}
          open={showPauseDialog}
          onOpenChange={setShowPauseDialog}
        />
      )}
      {row.original.providerId && (
        <OpportunityResumeDialog
          providerId={row.original.providerId}
          open={showResumeDialog}
          onOpenChange={setShowResumeDialog}
        />
      )}
    </>
  );
}
