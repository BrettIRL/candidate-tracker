import type { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DeleteAlertDialog } from '@/components/delete-alert-dialog';
import { EditUserDialog } from '@/components/edit-user-dialog';
import { Icons } from '@/components/icons';
import { PasswordResetDialog } from '@/components/password-reset-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import type { SafeUser } from '@/db/schema/users';

async function deleteUser(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to delete user. Status: ${response.status}. ${error.message}`,
      );
    }

    return true;
  } catch (error) {
    toast({
      title: 'Error Deleting User',
      description: 'User was not deleted. Please try again.',
      variant: 'destructive',
    });

    return false;
  }
}

interface DataTableRowActionsProps {
  count: number;
  row: Row<SafeUser>;
}

export function DataTableRowActions({ count, row }: DataTableRowActionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [showPasswordResetDialog, setShowPasswordResetDialog] =
    useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDeleteLoading(true);

    const deleted = await deleteUser(row.original.id);

    if (deleted) {
      setShowDeleteAlert(false);
      router.refresh();
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
          <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowPasswordResetDialog(true)}>
            Change Password
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
      <EditUserDialog
        title="Edit User"
        description="Modify existing user."
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        user={row.original}
      />
      <DeleteAlertDialog
        title="Are you sure you want to delete this user?"
        description="This action cannot be undone."
        open={showDeleteAlert && count > 1}
        loading={isDeleteLoading}
        onOpenChange={setShowDeleteAlert}
        onAction={handleDelete}
      />
      <PasswordResetDialog
        open={showPasswordResetDialog}
        onOpenChange={setShowPasswordResetDialog}
        userId={row.original.id}
      />
    </>
  );
}
