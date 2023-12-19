import type { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components//ui/button';
import { DeleteAlertDialog } from '@/components/delete-alert-dialog';
import { Icons } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import type { Question } from '@/db/schema/assessment';

async function deleteQuestion(questionId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/assessments/questions/${questionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to delete question. Status: ${response.status}. ${error.message}`,
      );
    }

    return true;
  } catch (error) {
    toast({
      title: 'Error Deleting Question',
      description: 'Question was not deleted. Please try again.',
      variant: 'destructive',
    });

    return false;
  }
}

interface DataTableRowActionsProps {
  row: Row<Omit<Question, 'category'> & { category: string }>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDeleteLoading(true);

    const deleted = await deleteQuestion(row.original.id + '');

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
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        title="Are you sure you want to delete this question?"
        description="This action cannot be undone."
        open={showDeleteAlert}
        loading={isDeleteLoading}
        onOpenChange={setShowDeleteAlert}
        onAction={handleDelete}
      />
    </>
  );
}
