'use client';

import { Table } from '@tanstack/react-table';

import { useState } from 'react';
import { CSVLink } from 'react-csv';
import { ConfirmationAlertDialog } from './confirmation-alert-dialog';
import { sendUnsuccessfulSMS } from '@/actions/candidate';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { JoinedCandidateOpportunity } from '@/ts/types';

interface DataTableActionsProps<TData> {
  table: Table<TData>;
}

export function DataTableActions<TData>({
  table,
}: DataTableActionsProps<TData>) {
  const [showUnsuccessfulDialog, setShowUnsuccessfulDialog] =
    useState<boolean>(false);
  const [isUnsuccessfulLoading, setIsUnsuccessfulLoading] =
    useState<boolean>(false);

  const csvData = table
    .getRowModel()
    .rows.flatMap(row =>
      Object.values(row.original as JoinedCandidateOpportunity),
    );

  const handleUnsuccessful = async () => {
    setIsUnsuccessfulLoading(true);

    const opportunityId = (
      table.getCoreRowModel().rows[0].original as JoinedCandidateOpportunity
    ).opportunities.id;
    const result = await sendUnsuccessfulSMS(opportunityId);
    if (result.success) {
      toast({
        title: 'Success',
        description: 'Unsuccessful candidates have been notified',
      });
    } else {
      toast({
        title: 'Error notifying unsuccessful candidates',
        description:
          'There was a problem notifying unsuccessful candidates. Please try again.',
        variant: 'destructive',
      });
    }
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
            <Icons.gear className="mr-2 h-4 w-4" />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setShowUnsuccessfulDialog(true)}>
            Notify Unsuccessful
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CSVLink filename="candidate_tracker_export.csv" data={csvData}>
              Export CSV
            </CSVLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmationAlertDialog
        title="Are you sure you want to notify all unsuccessful candidates?"
        description="This will send an SMS to all unsuccessful candidates. This action cannot be undone."
        loading={isUnsuccessfulLoading}
        open={showUnsuccessfulDialog}
        onOpenChange={setShowUnsuccessfulDialog}
        onAction={handleUnsuccessful}
      />
    </>
  );
}
