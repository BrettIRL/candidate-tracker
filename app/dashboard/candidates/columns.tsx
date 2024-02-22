'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Icons } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import type { Candidate } from '@/db/schema/candidates';

export const columns: ColumnDef<Candidate>[] = [
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
    accessorKey: 'age',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('age')}</div>
    ),
  },
  {
    accessorKey: 'gender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('gender')}</div>
    ),
  },
  {
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="City" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('city')}</div>
    ),
  },
  {
    accessorKey: 'province',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Province" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('province')}</div>
    ),
  },
  {
    accessorKey: 'hasLicense',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {row.getValue('hasLicense') ? (
          <Icons.check className="h-4 w-4" />
        ) : (
          <Icons.close className="h-4 w-4" />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'hasMatric',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Matric" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {row.getValue('hasMatric') ? (
          <Icons.check className="h-4 w-4" />
        ) : (
          <Icons.close className="h-4 w-4" />
        )}
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
