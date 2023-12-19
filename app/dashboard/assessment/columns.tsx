'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import type { Question } from '@/db/schema/assessment';

export const columns: ColumnDef<
  Omit<Question, 'category'> & { category: string }
>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="truncate font-medium">{row.getValue('category')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'question',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Question" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="truncate font-medium">{row.getValue('question')}</span>
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
