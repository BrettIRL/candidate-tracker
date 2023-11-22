import { format } from 'date-fns';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { AddressSelector } from '@/components/address-selector';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { contractEnum } from '@/db/schema/opportunities';
import { contractTypeTextMapping } from '@/lib/mappings';
import { cn } from '@/lib/utils';

interface OpportunityDetailsFormProps {
  isLoading: boolean;
}

export function OpportunityDetailsForm({
  isLoading,
}: OpportunityDetailsFormProps) {
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const form = useFormContext();
  const watchContractType = form.watch('contractType');

  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} disabled={isLoading} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <RichTextEditor
                  initialValue={field.value}
                  onChange={field.onChange}
                  readonly={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="yesOpportunity"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>YES Opportunity</FormLabel>
              <FormDescription>
                Opportunties offered in conjunction with Youth Employment
                Services
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isLoading}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="yesServiceProgram"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0">
              <FormLabel>YES Service Program</FormLabel>
              <FormDescription>
                Opportunities requiring funding from the jobs fund
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isLoading}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contractType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contract Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a contract type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {contractEnum.enumValues.map(value => (
                  <SelectItem key={value} value={value}>
                    {contractTypeTextMapping[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {['fixed', 'partTime'].includes(watchContractType) && (
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Duration</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={0}
                  disabled={isLoading}
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Contract duration in months</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="capacity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Vacancies</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                min={1}
                disabled={isLoading}
                onChange={e => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <AddressSelector
              defaultValue={field.value}
              onChange={field.onChange}
              disabled={isLoading}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="closingDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Closing Date</FormLabel>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-[240px] pl-3 text-left font-normal',
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
                  disabled={[{ before: new Date() }] || isLoading}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </>
  );
}
