'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './actions';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { RequirementsHoverCard } from '@/components/requirements-hover-card';
import { Checkbox } from '@/components/ui/checkbox';
import type { Candidate, OpportunityToCandidate } from '@/db/schema/candidates';
import { Opportunity } from '@/db/schema/opportunities';
import { candidateSteps } from '@/lib/mappings';

export const columns: ColumnDef<{
  candidates: Candidate;
  opportunities: Opportunity;
  opportunities_to_candidates: OpportunityToCandidate;
}>[] = [
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
      return `${row.candidates.firstName} ${row.candidates.lastName}`;
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
    accessorFn: row => row.candidates.age,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('age')}</div>
    ),
  },
  {
    accessorKey: 'gender',
    accessorFn: row => row.candidates.gender,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('gender')}</div>
    ),
  },
  {
    accessorKey: 'rank',
    accessorFn: row => row.opportunities_to_candidates.saYouthRank,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('rank')}</div>
    ),
  },
  {
    accessorKey: 'requirements',
    accessorFn: row => {
      let count = [
        'meetsAge',
        'meetsGender',
        'meetsRace',
        'meetsDisability',
        'meetsEducation',
        'meetsLanguage',
      ].filter(
        requirement =>
          row.opportunities_to_candidates[
            requirement as keyof OpportunityToCandidate
          ],
      ).length;

      if (+row.opportunities_to_candidates.distance < 20) {
        count++;
      }

      return count;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requirements" />
    ),
    cell: ({ row }) => (
      <RequirementsHoverCard
        count={row.getValue<number>('requirements')}
        row={row.original.opportunities_to_candidates}
      />
    ),
  },
  {
    accessorKey: 'distance',
    accessorFn: row => row.opportunities_to_candidates.distance,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('distance')}</div>
    ),
  },
  {
    accessorKey: 'step',
    accessorFn: row => row.opportunities_to_candidates.step,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Step" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue('step')} -{' '}
          {candidateSteps[row.getValue<number>('step')]}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'assessment',
    accessorFn: () => 'Incomplete',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessment" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">{row.getValue('assessment')}</div>
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
