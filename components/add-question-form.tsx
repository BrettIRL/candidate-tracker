'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { CategorySelector } from '@/components/category-selector';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import {
  addQuestionSchema,
  type QuestionValues,
} from '@/validations/assessment';

async function saveQuestion(data: QuestionValues) {
  try {
    const response = await fetch('/api/assessments/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to create question. Status: ${response.status}. ${error.message}`,
      );
    }

    return true;
  } catch (error) {
    toast({
      title: 'Error creating question',
      description: (error as Error).message,
      variant: 'destructive',
    });
    return false;
  }
}

export function AddQuestionForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<QuestionValues>({
    resolver: zodResolver(addQuestionSchema),
    defaultValues: {
      question: '',
      category: undefined,
      preScreening: false,
      multipleAnswers: false,
      answers: [{ answer: '', correct: false }],
    },
    mode: 'onChange',
  });

  const answers = useFieldArray({
    control: form.control,
    name: 'answers',
  });

  const handleSubmit = async (data: QuestionValues) => {
    setIsLoading(true);

    const success = await saveQuestion(data);

    if (success) {
      form.reset();
      router.refresh();
      router.push('/dashboard/assessment');
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
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
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <CategorySelector
                defaultValue={field.value}
                onChange={field.onChange}
                disabled={isLoading}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preScreening"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Pre-Screening</FormLabel>
                <FormDescription>
                  Pre-Screening questions are displayed before the assessment
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
          name="multipleAnswers"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Multiple Answers</FormLabel>
                <FormDescription>
                  Allow users to select multiple answers
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
        <Separator />
        {answers.fields.map((field, index) => (
          <div key={field.id} className="flex w-full space-x-2">
            <FormField
              name={`answers.${index}.correct`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex max-h-9 w-9 items-center justify-center rounded-md border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name={`answers.${index}.answer`}
              control={form.control}
              render={({ field }) => (
                <FormItem className="grow">
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => answers.remove(index)}
              disabled={answers.fields.length <= 1}
            >
              <Icons.close className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <FormField name="answers.root" render={() => <FormMessage />} />
        <div className="flex justify-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => answers.append({ answer: '', correct: false })}
          >
            <Icons.plus className="h-4 w-4" />
            Add Answer
          </Button>
        </div>
        <Separator />
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Add Question
        </Button>
      </form>
    </Form>
  );
}
