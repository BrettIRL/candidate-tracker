'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Icons } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import type { Question } from '@/db/schema/assessment';

export const columns: ColumnDef<
  Omit<Question, 'category' | 'scenario'> & { category: string }
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue('category'));
    },
  },
  {
    accessorKey: 'type',
    accessorFn: row => row.preScreening,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const preScreening = !!row.getValue('type');
      return (
        <div className="flex w-[120px] items-center">
          {preScreening ? (
            <Icons.search className="mr-2 h-4 w-4" />
          ) : (
            <Icons.clipboard className="mr-2 h-4 w-4" />
          )}
          <span>{preScreening ? 'Pre-Screening' : 'Assessment'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'question',
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <div className="flex max-w-[670px] space-x-2 truncate">
        <span
          className="truncate font-medium"
          dangerouslySetInnerHTML={{ __html: row.getValue('question') }}
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
