'use client';

import { Table } from '@tanstack/react-table';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/data-table-view-options';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { capitalize } from '@/lib/utils';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  facetFilters?: string[];
  filterColumn: string;
}

export function DataTableToolbar<TData>({
  table,
  facetFilters,
  filterColumn,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const rows = table.getRowModel().rows;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Filter by ${filterColumn}...`}
          value={
            (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''
          }
          onChange={event =>
            table.getColumn(filterColumn)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {facetFilters?.map(facet =>
          table.getColumn(facet) ? (
            <DataTableFacetedFilter
              key={facet}
              column={table.getColumn(facet)}
              title={facet}
            />
          ) : null,
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icons.close className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
