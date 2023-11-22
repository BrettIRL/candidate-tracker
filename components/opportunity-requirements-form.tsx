import { useFormContext } from 'react-hook-form';
import { FormHeader } from '@/components/form-header';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import {
  educationEnum,
  genderEnum,
  languageEnum,
  raceEnum,
} from '@/db/schema/opportunities';
import {
  educationTextMapping,
  genderTextMapping,
  languageTextMapping,
  raceTextMapping,
} from '@/lib/mappings';

interface OpportunityRequirementsFormProps {
  isLoading: boolean;
}

export function OpportunityRequirementsForm({
  isLoading,
}: OpportunityRequirementsFormProps) {
  const form = useFormContext();

  return (
    <>
      <FormHeader
        heading="Requirements"
        text="Candidate requirements for this opportunity"
      />
      <FormField
        control={form.control}
        name="education"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Education</FormLabel>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {educationEnum.enumValues.map(education => (
                <FormField
                  key={education}
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem
                      key={education}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(education)}
                          onCheckedChange={checked => {
                            return checked
                              ? field.onChange([...field.value, education])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== education,
                                  ),
                                );
                          }}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {educationTextMapping[education]}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="language"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Language</FormLabel>
              <FormDescription>
                A maximum of 2 languagues can be selected
              </FormDescription>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {languageEnum.enumValues.map(language => (
                <FormField
                  key={language}
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem
                      key={language}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(language)}
                          onCheckedChange={checked => {
                            return checked
                              ? field.onChange([...field.value, language])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== language,
                                  ),
                                );
                          }}
                          disabled={
                            isLoading ||
                            (field.value?.length >= 2 &&
                              !field.value?.includes(language))
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {languageTextMapping[language]}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gender"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Gender</FormLabel>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {genderEnum.enumValues.map(gender => (
                <FormField
                  key={gender}
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem
                      key={gender}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(gender)}
                          onCheckedChange={checked => {
                            return checked
                              ? gender === 'all'
                                ? field.onChange([gender])
                                : field.onChange([...field.value, gender])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== gender,
                                  ),
                                );
                          }}
                          disabled={
                            isLoading ||
                            (gender !== 'all' && field.value.includes('all'))
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {genderTextMapping[gender]}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="race"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Race</FormLabel>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {raceEnum.enumValues.map(race => (
                <FormField
                  key={race}
                  control={form.control}
                  name="race"
                  render={({ field }) => (
                    <FormItem
                      key={race}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(race)}
                          onCheckedChange={checked => {
                            return checked
                              ? race === 'all'
                                ? field.onChange([race])
                                : field.onChange([...field.value, race])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== race,
                                  ),
                                );
                          }}
                          disabled={
                            isLoading ||
                            (race !== 'all' && field.value.includes('all'))
                          }
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {raceTextMapping[race]}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-8">
        <FormField
          control={form.control}
          name="minAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Age</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={18}
                  max={form.getValues('maxAge') || 34}
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
          name="maxAge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Age</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={form.getValues('minAge') || 18}
                  max={34}
                  disabled={isLoading}
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="requirements"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
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
