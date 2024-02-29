import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { pauseSAYOpportunity } from '@/actions/opportunity';
import { Icons } from '@/components/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
  pauseOpportunitySchema,
  type PauseOpportunityValues,
} from '@/validations/opportunity';

interface OpportunityPauseDialogProps {
  providerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OpportunityPauseDialog({
  providerId,
  open,
  onOpenChange,
}: OpportunityPauseDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<PauseOpportunityValues>({
    resolver: zodResolver(pauseOpportunitySchema),
    defaultValues: { reason: '' },
    mode: 'onChange',
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    const result = await pauseSAYOpportunity(providerId, 'Reason');

    if (result.success) {
      onOpenChange(false);
      router.refresh();
      form.reset();
    } else {
      toast({
        title: 'Error Changing Status',
        description:
          'There was problem changing the SA Youth opportunity status. Please try again',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pause SA Youth Opportunity</DialogTitle>
          <DialogDescription>
            Pause an active SA Youth opportunity
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Pause
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
