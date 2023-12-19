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
import type { NewAddress } from '@/db/schema/addresses';

async function addAddress(data: NewAddress) {
  try {
    const response = await fetch('/api/opportunities/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to create address. Status: ${response.status}. ${error.message}`,
      );
    }

    return true;
  } catch (error) {
    toast({
      title: 'Error Creating Address',
      description: 'Address was not created. Please try again.',
      variant: 'destructive',
    });
    return false;
  }
}

const addressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address1: z.string().min(1, 'Street is required'),
  address2: z.string(),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(4).max(4),
  contactName: z.string().min(1, 'Name is required'),
  contactSurname: z.string().min(1, 'Surname is required'),
  contactEmail: z.string().email().min(1, 'Email is required'),
  contactPhone: z.string(),
});

type AddressValues = z.infer<typeof addressSchema>;

interface AddAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddAddressDialog({
  open,
  onOpenChange,
}: AddAddressDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  const handleSubmit = async (data: AddressValues) => {
    setIsLoading(true);

    const created = await addAddress(data);

    if (created) {
      router.refresh();
      onOpenChange(false);
    }

    setIsLoading(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full space-y-4 overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Create Address</SheetTitle>
          <SheetDescription>Create new address</SheetDescription>
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
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suburb</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetHeader className="pt-4">
              <SheetTitle className="text-base">Contact Person</SheetTitle>
            </SheetHeader>
            <Separator />
            <FormField
              control={form.control}
              name="contactName"
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
            <FormField
              control={form.control}
              name="contactSurname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input className="mb-4" disabled={isLoading} {...field} />
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
                Add Address
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
