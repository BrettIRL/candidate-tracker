import sanitize from 'sanitize-html';
import { z } from 'zod';
import {
  contractEnum,
  salaryFrequencyEnum,
  salaryTypeEnum,
} from '@/db/schema/opportunities';

export const addOpportunitySchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().transform(value => sanitize(value)),
    yesOpportunity: z.boolean(),
    yesServiceProgram: z.boolean(),
    contractType: z.enum(contractEnum.enumValues),
    duration: z.number().min(1, 'Duration is required'),
    capacity: z.number().min(1, 'Capacity is required'),
    closingDate: z.date({
      required_error: 'Closing date is required',
    }),
    salaryType: z.enum(salaryTypeEnum.enumValues, {
      required_error: 'Salary type is required',
    }),
    salaryFrequency: z.enum(salaryFrequencyEnum.enumValues).optional(),
    salary: z.number(),
    benefits: z.string().transform(value => sanitize(value)),
    requirements: z
      .string()
      .min(1, 'Requirements are required')
      .transform(value => sanitize(value)),
    education: z
      .enum(['degree', 'diploma', 'matric', 'postgrad', 'tvet'])
      .array(),
    language: z
      .enum([
        'afrikaans',
        'english',
        'isiNdebele',
        'isiXhosa',
        'isiZulu',
        'sepedi',
        'sesotho',
        'setswana',
        'siSwati',
        'tshivenda',
        'xitsonga',
        'german',
        'french',
        'portuguese',
      ])
      .array()
      .max(2, 'No more than 2 languages can be selected'),
    gender: z.enum(['all', 'male', 'female']).array(),
    race: z
      .enum(['all', 'asian', 'black', 'coloured', 'indian', 'white'])
      .array(),
    minAge: z.number().min(18).max(34),
    maxAge: z.number().min(18).max(34),
    address: z.object(
      {
        id: z.number(),
        name: z.string(),
        address1: z.string(),
        address2: z.string(),
        city: z.string(),
        province: z.string(),
        postalCode: z.string(),
        contactName: z.string(),
        contactSurname: z.string(),
        contactEmail: z.string(),
        contactPhone: z.string(),
      },
      { required_error: 'Address is required' },
    ),
  })
  .superRefine((fields, ctx) => {
    const { contractType, duration, salary, salaryFrequency, salaryType } =
      fields;

    if (contractType !== 'fullTime' && duration < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Duration is required',
        path: ['duration'],
      });
    }

    if (salaryType !== 'unspecified') {
      if (salary < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Salary is required',
          path: ['salary'],
        });
      }

      if (!salaryFrequency) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Salary frequency is required',
          path: ['salaryFrequency'],
        });
      }
    }
  });

export const pauseOpportunitySchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
});

export const resumeOpportunitySchema = z.object({
  closingDate: z.date({
    required_error: 'Closing date is required',
  }),
});

export type OpportunityValues = z.infer<typeof addOpportunitySchema>;
export type PauseOpportunityValues = z.infer<typeof pauseOpportunitySchema>;
export type ResumeOpportunityValues = z.infer<typeof resumeOpportunitySchema>;
