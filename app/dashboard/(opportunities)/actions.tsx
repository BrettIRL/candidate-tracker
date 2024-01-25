import type { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Opportunity } from '@/db/schema/opportunities';

interface DataTableRowActionsProps {
  row: Row<Opportunity>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <Icons.dotsHorizontal className="h-4 w-4" />
            <span className="sr-only">Open Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onSelect={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT}/candidates/${row.original.id}`,
              )
            }
          >
            View Candidates
          </DropdownMenuItem>
          <DropdownMenuItem>Change Status</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex cursor-pointer items-center text-destructive focus:text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
