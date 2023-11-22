import { useFormContext } from 'react-hook-form';
import { FormHeader } from '@/components/form-header';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { salaryFrequencyEnum, salaryTypeEnum } from '@/db/schema/opportunities';
import {
  salaryFrequencyTextMapping,
  salaryTypeTextMapping,
} from '@/lib/mappings';

interface OpportunityCompensationFormProps {
  isLoading: boolean;
}

export function OpportunityCompensationForm({
  isLoading,
}: OpportunityCompensationFormProps) {
  const form = useFormContext();
  const watchSalaryType = form.watch('salaryType');

  return (
    <>
      <FormHeader
        heading="Compensation"
        text="Salary and benefits for this opportunity"
      />
      <FormField
        control={form.control}
        name="salaryType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Salary Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a salary type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {salaryTypeEnum.enumValues.map(value => (
                  <SelectItem key={value} value={value}>
                    {salaryTypeTextMapping[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {watchSalaryType && watchSalaryType !== 'unspecified' && (
        <>
          <FormField
            control={form.control}
            name="salaryFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Frequency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a salary frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {salaryFrequencyEnum.enumValues.map(value => (
                      <SelectItem key={value} value={value}>
                        {salaryFrequencyTextMapping[value]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    disabled={isLoading}
                    onChange={e => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      <FormField
        control={form.control}
        name="benefits"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Benefits</FormLabel>
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
    </>
  );
}
