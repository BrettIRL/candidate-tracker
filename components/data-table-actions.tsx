'use client';

import { Table } from '@tanstack/react-table';

import { CSVLink } from 'react-csv';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { JoinedCandidateOpportunity } from '@/ts/types';

interface DataTableActionsProps<TData> {
  table: Table<TData>;
}

export function DataTableActions<TData>({
  table,
}: DataTableActionsProps<TData>) {
  const csvData = table
    .getRowModel()
    .rows.flatMap(row =>
      Object.values(row.original as JoinedCandidateOpportunity),
    );

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
        <DropdownMenuItem>
          <CSVLink filename="candidate_tracker_export.csv" data={csvData}>
            Export CSV
          </CSVLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
