'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import type { Ambassador } from '@/db/schema/ambassadors';

export const columns: ColumnDef<Ambassador>[] = [
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
    accessorKey: 'name',
    accessorFn: row => {
      return `${row.firstName} ${row.lastName}`;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue('name')}
        </span>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row, table }) => (
      <div className="flex justify-end">
        <DataTableRowActions
          row={row}
          count={table.getCoreRowModel().rows.length}
        />
      </div>
    ),
  },
];
