import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RichTextEditor } from './ui/rich-text-editor';
import { addScenario } from '@/actions/scenarios';
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
import { ScenarioValues, addScenarioSchema } from '@/validations/assessment';

interface AddScenarioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddScenarioDialog({
  open,
  onOpenChange,
}: AddScenarioDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<ScenarioValues>({
    resolver: zodResolver(addScenarioSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  const handleSubmit = async (scenario: ScenarioValues) => {
    setIsLoading(true);

    const result = await addScenario(scenario);

    if (result.success) {
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
          <SheetTitle>Create Scenario</SheetTitle>
          <SheetDescription>Create new question scenario</SheetDescription>
        </SheetHeader>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      initialValue={field.value}
                      onChange={field.onChange}
                      readonly={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Scenario
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
