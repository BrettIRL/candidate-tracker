import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

async function getCandidate(idNumber: string, opportunityId: string) {
  try {
    const response = await fetch(
      `/api/candidates/${opportunityId}/${idNumber}`,
    );

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to retrieve candidate for opportunity. Status: ${response.status}. ${error.message}`,
      );
    }

    return await response.json();
  } catch (error) {
    toast({
      title: 'Error Finding Candidate',
      description:
        'Could not find candidate with that ID number for that opportunity.',
      variant: 'destructive',
    });
    return undefined;
  }
}

const idSchema = z.object({
  idNumber: z.string().regex(/^\d{13}$/, 'Please enter a valid ID number'),
});

type IdFormData = z.infer<typeof idSchema>;

interface CandidateIdInputProps {
  opportunityId: string;
  onChange: (candidateId: string) => void;
}

export function CandidateIdInput({
  opportunityId,
  onChange,
}: CandidateIdInputProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdFormData>({ resolver: zodResolver(idSchema) });

  const onSubmit = async (data: IdFormData) => {
    setIsLoading(true);

    const candidate = await getCandidate(data.idNumber, opportunityId);

    if (candidate) {
      onChange(candidate.candidateId);
    }
    setIsLoading(false);
  };

  return (
    <div className="col-span-full flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Candidate Assessment</CardTitle>
          <CardDescription>
            Please enter your South African ID number to access the assessment
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                type="text"
                id="idNumber"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                {...register('idNumber')}
              />
              {errors?.idNumber && (
                <p className="px-1 text-xs text-red-600">
                  {errors.idNumber.message}{' '}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
