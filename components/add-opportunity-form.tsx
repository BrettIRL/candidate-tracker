'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { OpportunityCompensationForm } from './opportunity-compensation-form';
import { OpportunityDetailsForm } from './opportunity-details-form';
import { OpportunityRequirementsForm } from './opportunity-requirements-form';
import { createOpportunity } from '@/actions/create-opportunity';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useOpportunityContext } from '@/contexts/OpportunityContext';
import {
  addOpportunitySchema,
  type OpportunityValues,
} from '@/validations/opportunity';

export function AddOpportunityForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { templateOpportunity: template } = useOpportunityContext();
  const router = useRouter();

  const form = useForm<OpportunityValues>({
    resolver: zodResolver(addOpportunitySchema),
    defaultValues: {
      title: template?.title || '',
      description: template?.description || '',
      yesOpportunity: false,
      yesServiceProgram: false,
      contractType: template?.contractType,
      duration: 0,
      capacity: template?.capacity || 1,
      closingDate: undefined,
      salaryType: template?.salaryType,
      salaryFrequency: template?.salaryFrequency || undefined,
      salary: !isNaN(Number(template?.salary)) ? Number(template?.salary) : 0,
      benefits: template?.benefits || '',
      requirements: template?.requirements || '',
      education: template?.education || [],
      language: template?.language || [],
      gender: template?.gender || [],
      race: template?.race || [],
      minAge: template?.minAge || 18,
      maxAge: template?.maxAge || 34,
      address: undefined,
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data: OpportunityValues) => {
    setIsLoading(true);

    const result = await createOpportunity(data);

    if (result.success) {
      form.reset();
      router.refresh();
      router.push(process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT || '/');
    } else {
      toast({
        title: 'Error creating opportunity',
        description: result.error,
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <OpportunityDetailsForm isLoading={isLoading} />
        <OpportunityCompensationForm isLoading={isLoading} />
        <OpportunityRequirementsForm isLoading={isLoading} />
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Add Opportunity
        </Button>
      </form>
    </Form>
  );
}
