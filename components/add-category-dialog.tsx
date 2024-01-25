import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { toast } from '@/components/ui/use-toast';
import type { NewCategory } from '@/db/schema/assessment';
import { CategoryValues, addCategorySchema } from '@/validations/assessment';

async function addCategory(data: NewCategory) {
  try {
    const response = await fetch('/api/assessments/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to create category. Status: ${response.status}. ${error.message}`,
      );
    }

    return true;
  } catch (error) {
    toast({
      title: 'Error Creating Catregory',
      description: 'Category was not created. Please try again.',
      variant: 'destructive',
    });
    return false;
  }
}

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCategoryDialog({
  open,
  onOpenChange,
}: AddCategoryDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<CategoryValues>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {},
    mode: 'onChange',
  });

  const handleSubmit = async (data: CategoryValues) => {
    setIsLoading(true);

    const created = await addCategory(data);

    if (created) {
      router.refresh();
      form.reset();
      onOpenChange(false);
    }

    setIsLoading(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full space-y-4 overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Create Category</SheetTitle>
          <SheetDescription>Create new question category</SheetDescription>
        </SheetHeader>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Category
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
