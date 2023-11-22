'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format, isAfter } from 'date-fns';
import Link from 'next/link';
import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Icons } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import type { Opportunity } from '@/db/schema/opportunities';

export const columns: ColumnDef<Opportunity>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue('title')}
        </span>
      </div>
    ),
  },
  {
    id: 'status',
    accessorKey: 'closingDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const datePassed = isAfter(new Date(), row.getValue('closingDate'));
      return (
        <div className="flex w-[100px] items-center">
          {datePassed ? (
            <Icons.closed className="mr-2 h-4 w-4 text-red-500" />
          ) : (
            <Icons.open className="mr-2 h-4 w-4 text-green-500" />
          )}
          <span>{datePassed ? 'Closed' : 'Open'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'closingDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Closing Date" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[100px] truncate">
          {format(row.getValue('closingDate'), 'dd MMM yyyy')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'providerId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SA Youth" />
    ),
    cell: ({ row }) => {
      const providerId = row.getValue('providerId');
      return (
        <div className="flex w-[100px] items-center">
          {!!providerId ? (
            <Icons.online className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Icons.offline className="mr-2 h-4 w-4 text-red-500" />
          )}
          <span>{!!providerId ? 'Online' : 'Offline'}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => (
      <div className="flex justify-end">
        <DataTableRowActions row={row} />
      </div>
    ),
  },
];
