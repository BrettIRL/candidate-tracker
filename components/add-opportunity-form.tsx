'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { OpportunityCompensationForm } from './opportunity-compensation-form';
import { OpportunityDetailsForm } from './opportunity-details-form';
import { OpportunityRequirementsForm } from './opportunity-requirements-form';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import {
  addOpportunitySchema,
  type OpportunityValues,
} from '@/validations/opportunity';

export function AddOpportunityForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<OpportunityValues>({
    resolver: zodResolver(addOpportunitySchema),
    defaultValues: {
      title: '',
      description: '',
      yesOpportunity: false,
      yesServiceProgram: false,
      contractType: undefined,
      duration: 0,
      capacity: 1,
      closingDate: undefined,
      salaryType: undefined,
      salaryFrequency: undefined,
      salary: 0,
      benefits: '',
      requirements: '',
      education: [],
      language: [],
      gender: [],
      race: [],
      minAge: 18,
      maxAge: 34,
      address: undefined,
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data: OpportunityValues) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/opportunities', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          closingDate: format(data.closingDate, 'yyyy-MM-dd'),
        }),
      });

      if (response.ok) {
        setIsLoading(false);
        form.reset();
        router.refresh();
        router.push(process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT || '/');
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: 'Error creating opportunity',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
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
