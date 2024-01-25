import { Fragment, useEffect, useMemo, useState } from 'react';
import { AssessmentQuestionsSkeleton } from './assessment-questions-skeleton';
import { AssessmentQuestion as Question } from '@/components/assessment-question';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import type { AssessmentQuestion } from '@/ts/types';

async function fetchPrescreeningQuestions(): Promise<
  AssessmentQuestion[] | undefined
> {
  try {
    const response = await fetch('/api/assessments/questions/prescreening');

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to fetch questions. Status: ${response.status}. ${error.message}`,
      );
    }

    const questions = await response.json();
    return questions;
  } catch (error) {
    toast({
      title: 'Error fetching prescreening questions',
      description:
        'There was a problem fetching prescreening questions. Please reload page and try again',
      variant: 'destructive',
    });
    return undefined;
  }
}

interface CandidatePrescreeningProps {
  isLoading: boolean;
  onSubmit: (answers: Record<number, number>) => void;
}

export function CandidatePrescreening({
  isLoading,
  onSubmit,
}: CandidatePrescreeningProps) {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const questions = await fetchPrescreeningQuestions();
      if (questions) {
        setQuestions(questions);
      }
      setIsFetching(false);
    })();
  }, []);

  const allQuestionsAnswered = useMemo(() => {
    return questions.length <= Object.keys(answers).length;
  }, [questions, answers]);

  const handleAnswerSelect = (questionId: number, selectedAnswer: number) => {
    setAnswers({ ...answers, [questionId]: selectedAnswer });
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      onSubmit(answers);
    }
  };

  return (
    <Fragment>
      <span></span>
      <div className="grid gap-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Assessment Questions
        </h1>
        {isFetching && <AssessmentQuestionsSkeleton />}
        {questions.map(question => (
          <Question
            key={question.id}
            question={question}
            answer={answers[question.id]}
            onSelect={handleAnswerSelect}
          />
        ))}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered || isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
