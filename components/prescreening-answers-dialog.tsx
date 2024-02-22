import { useEffect, useState } from 'react';
import { PrescreeningAnswersSkeleton } from './prescreening-answers-skeleton';
import { fetchCandidatePrescreeningAnswers } from '@/actions/candidate';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { Candidate } from '@/db/schema/candidates';

interface PrescreeningAnswersDialogProps {
  candidate?: Candidate;
  opportunityId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrescreeningAnswersDialog({
  candidate,
  opportunityId,
  open,
  onOpenChange,
}: PrescreeningAnswersDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      if (open && candidate?.id && opportunityId) {
        setIsLoading(true);
        const result = await fetchCandidatePrescreeningAnswers(
          candidate.id,
          opportunityId,
        );
        if (result.success) {
          setAnswers(result.data!.answers || []);
        }
        setIsLoading(false);
      }
    })();
  }, [open, candidate?.id, opportunityId]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full space-y-4 overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {candidate?.firstName} {candidate?.lastName}
          </SheetTitle>
          <SheetDescription>Pre-Screening Answers</SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="space-y-8">
          {isLoading ? (
            <PrescreeningAnswersSkeleton />
          ) : (
            answers.map((response, idx) => (
              <div key={idx}>
                <div
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: response.question }}
                />
                <p className="text-foreground">{response.answer}</p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
