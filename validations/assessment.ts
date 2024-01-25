import { z } from 'zod';

export const addQuestionSchema = z
  .object({
    category: z.number({ required_error: 'Category is required' }),
    question: z.string().min(1, 'Question is required'),
    preScreening: z.boolean(),
    answers: z
      .array(
        z.object({
          answer: z.string().min(1, 'Answer is required'),
          weight: z.number({ required_error: 'Weight is required' }).min(0),
        }),
      )
      .min(1, 'At least one answer is required'),
  })
  .superRefine((fields, ctx) => {
    if (fields.answers.filter(answer => answer.weight > 0).length < 1) {
      ctx.addIssue({
        code: 'custom',
        message: 'At least one answer needs a weight greater than 0',
        path: ['answers.root'],
      });
    }
  });

export const addCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});

export type QuestionValues = z.infer<typeof addQuestionSchema>;
export type CategoryValues = z.infer<typeof addCategorySchema>;
