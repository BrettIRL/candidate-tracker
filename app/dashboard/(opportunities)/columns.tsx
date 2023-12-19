'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format, isAfter } from 'date-fns';
import Link from 'next/link';
import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Icons } from '@/components/icons';
import type { Opportunity } from '@/db/schema/opportunities';

export const columns: ColumnDef<Opportunity>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          <Link
            href={`${process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT}/candidates/${row.original.id}`}
          >
            {row.getValue('title')}
          </Link>
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
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DataTableRowActions row={row} />
      </div>
    ),
  },
];
