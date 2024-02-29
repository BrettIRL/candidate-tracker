import type { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteScenario } from '@/actions/scenarios';
import { DeleteAlertDialog } from '@/components/delete-alert-dialog';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import type { Scenario } from '@/db/schema/assessment';

interface DataTableRowActionsProps {
  row: Row<Scenario>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleteLoading(true);

    const result = await deleteScenario(row.original.id);

    if (result.success) {
      setShowDeleteAlert(false);
      router.refresh();
    } else {
      toast({
        title: 'Error Deleting Scenario',
        description:
          'There was an error deleting this scenario. Please try again',
        variant: 'destructive',
      });
    }

    setIsDeleteLoading(false);
  };

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
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        title="Are you sure you want to delete this scenario?"
        description="This action cannot be undone."
        open={showDeleteAlert}
        loading={isDeleteLoading}
        onOpenChange={setShowDeleteAlert}
        onAction={handleDelete}
      />
    </>
  );
}
