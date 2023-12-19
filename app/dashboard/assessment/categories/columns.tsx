'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import type { Category } from '@/db/schema/assessment';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className=" truncate font-medium">{row.getValue('name')}</span>
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
