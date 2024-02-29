import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { resumeSAYOpportunity } from '@/actions/opportunity';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import {
  resumeOpportunitySchema,
  type ResumeOpportunityValues,
} from '@/validations/opportunity';

interface OpportunityResumeDialogProps {
  providerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OpportunityResumeDialog({
  providerId,
  open,
  onOpenChange,
}: OpportunityResumeDialogProps) {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<ResumeOpportunityValues>({
    resolver: zodResolver(resumeOpportunitySchema),
    defaultValues: { closingDate: undefined },
    mode: 'onChange',
  });

  const handleSubmit = async ({ closingDate }: ResumeOpportunityValues) => {
    setIsLoading(true);

    const result = await resumeSAYOpportunity(providerId, closingDate);

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
          <DialogTitle>Resume SA Youth Opportunity</DialogTitle>
          <DialogDescription>
            Resume a paused SA Youth Opportunity
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
              name="closingDate"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Closing Date</FormLabel>
                  <FormControl>
                    <Popover
                      open={datePickerOpen}
                      onOpenChange={setDatePickerOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                            disabled={isLoading}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Icons.calendar className="ml-2 h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={e => {
                            field.onChange(e);
                            setDatePickerOpen(false);
                          }}
                          disabled={isLoading}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                Resume
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
