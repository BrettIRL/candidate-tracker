'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import type { Scenario } from '@/db/schema/assessment';

export const columns: ColumnDef<Scenario>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="title" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className=" truncate font-medium">{row.getValue('title')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scenario" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[670px] space-x-2">
        <span
          className="truncate font-medium"
          dangerouslySetInnerHTML={{ __html: row.getValue('description') }}
        ></span>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DataTableRowActions row={row} />
      </div>
    ),
  },
];
