import type { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteAddress } from '@/actions/addresses';
import { DeleteAlertDialog } from '@/components/delete-alert-dialog';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import type { Address } from '@/db/schema/addresses';

interface DataTableRowActionsProps {
  count: number;
  row: Row<Address>;
}

export function DataTableRowActions({ count, row }: DataTableRowActionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDeleteLoading(true);
    const response = await deleteAddress(row.original.id);
    if (response.success) {
      setShowDeleteAlert(false);
      router.refresh();
    } else {
      toast({
        title: 'Error deleting address',
        description: 'Address was not deleted. Please try again.',
        variant: 'destructive',
      });
    }
    setShowDeleteAlert(false);
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
          <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
            disabled={count <= 1}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <EditUserDialog */}
      {/*   title="Edit User" */}
      {/*   description="Modify existing user." */}
      {/*   open={showEditDialog} */}
      {/*   onOpenChange={setShowEditDialog} */}
      {/*   user={row.original} */}
      {/* /> */}
      <DeleteAlertDialog
        title="Are you sure you want to delete this address?"
        description="This action cannot be undone."
        open={showDeleteAlert && count > 1}
        loading={isDeleteLoading}
        onOpenChange={setShowDeleteAlert}
        onAction={handleDelete}
      />
    </>
  );
}
