import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import type { SafeUser } from '@/db/schema/users';

async function updateUser(user: SafeUser) {
  try {
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
      }),
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to update user. Status: ${response.status}. ${error.message}`,
      );
    }

    const updatedUser: SafeUser = await response.json();
    return updatedUser;
  } catch (error) {
    toast({
      title: 'Error Updating User',
      description: 'User was not updated. Please try again.',
      variant: 'destructive',
    });
    return null;
  }
}

const editUserSchema = z.object({
  email: z.string().email().min(1, 'Email is required'),
  name: z.string().min(1, 'Name is required'),
});

type EditUserValues = z.infer<typeof editUserSchema>;

interface EditUserDialogProps {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: SafeUser;
}

export function EditUserDialog({
  title,
  description,
  open,
  user,
  onOpenChange,
}: EditUserDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<EditUserValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data: EditUserValues) => {
    setIsLoading(true);

    const updatedUser = await updateUser({ ...data, id: user.id });

    if (updatedUser) {
      router.refresh();
      onOpenChange(false);
    }

    setIsLoading(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full space-y-4 sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johnd@example.com"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save User
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
