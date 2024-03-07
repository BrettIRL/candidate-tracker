import { Fragment, useEffect, useMemo, useState } from 'react';
import { AssessmentScenario } from './assessment-scenario';
import { AssessmentQuestion as Question } from '@/components/assessment-question';
import { AssessmentQuestionsSkeleton } from '@/components/assessment-questions-skeleton';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import type { AssessmentQuestion, QuestionsByCategory } from '@/ts/types';

async function fetchQuestions(): Promise<QuestionsByCategory | undefined> {
  try {
    const response = await fetch('/api/assessments/questions');

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
      title: 'Error fetching questions',
      description:
        'There was a problem fetching questions. Please reload page and try again',
      variant: 'destructive',
    });
    return undefined;
  }
}

interface CandidateAssessmentProps {
  isLoading: boolean;
  onSubmit: (answers: Record<number, number>) => void;
}

export function CandidateAssessment({
  isLoading,
  onSubmit,
}: CandidateAssessmentProps) {
  const [allQuestions, setAllQuestions] = useState<QuestionsByCategory>({});
  const [answered, setAnswered] = useState<{ [cat: string]: number[] }>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const questions = await fetchQuestions();
      if (questions) {
        const categoryArray = Object.keys(questions);

        setAllQuestions(questions);
        setCategories(categoryArray);
        setQuestions(questions[categoryArray[0]]);
      }
      setIsFetching(false);
    })();

    return () => {
      setAllQuestions({});
      setCategories([]);
      setQuestions([]);
    };
  }, []);

  const allQuestionsAnswered = useMemo(() => {
    const questionCount = Object.values(allQuestions).reduce(
      (count, question) => count + question.length,
      0,
    );
    return questionCount <= Object.keys(answers).length;
  }, [allQuestions, answers]);

  const categoryAnswered = useMemo(() => {
    const category = categories[selectedCategory];
    return answered[category]?.length === questions.length;
  }, [answered, categories, questions, selectedCategory]);

  const scenario = useMemo(() => {
    // NOTE: Assumes only one scenario per questions in category
    const questionsWithScenario = questions.filter(q => q.scenario);
    if (questionsWithScenario.length) {
      return questionsWithScenario[0].scenario;
    }

    return null;
  }, [questions]);

  const handleCategoryChange = (categoryIndex: number) => {
    const category = categories[categoryIndex];
    setSelectedCategory(categoryIndex);
    setQuestions(allQuestions[category]);
  };

  const handleAnswerSelect = (questionId: number, selectedAnswer: number) => {
    const cat = categories[selectedCategory];

    const newAnswers = { ...answers };
    if (newAnswers[questionId] === selectedAnswer) {
      delete newAnswers[questionId];
    } else {
      newAnswers[questionId] = selectedAnswer;
    }

    const answerCount = { ...answered };
    if (!answerCount[cat]) {
      answerCount[cat] = [];
    }
    if (!answerCount[cat].includes(questionId)) {
      answerCount[cat].push(questionId);
    } else {
      if (!newAnswers[questionId]) {
        answerCount[cat].splice(answerCount[cat].indexOf(questionId), 1);
      }
    }

    setAnswers(newAnswers);
    setAnswered(answerCount);
  };

  const handleSubmit = () => {
    if (allQuestionsAnswered) {
      onSubmit(answers);
    }
  };

  return (
    <Fragment>
      <ul className="hidden md:block">
        {categories.map((category, idx) => (
          <li key={idx}>
            <Button
              variant="link"
              className={cn(idx === selectedCategory ? 'font-bold' : '')}
              onClick={() => handleCategoryChange(idx)}
            >
              {category} ({answered[category]?.length || 0}/
              {allQuestions[category].length})
            </Button>
          </li>
        ))}
      </ul>
      <div className="grid gap-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Assessment Questions
        </h1>
        {isFetching && <AssessmentQuestionsSkeleton />}
        <AssessmentScenario scenario={scenario} />
        {questions.map(question => (
          <Question
            key={question.id}
            question={question}
            answer={answers[question.id]}
            onSelect={handleAnswerSelect}
          />
        ))}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => handleCategoryChange(selectedCategory - 1)}
            disabled={selectedCategory < 1}
          >
            Previous
          </Button>
          {selectedCategory + 1 < categories.length ? (
            <Button
              onClick={() => handleCategoryChange(selectedCategory + 1)}
              disabled={!categoryAnswered}
            >
              Next
            </Button>
          ) : (
            <Button
              disabled={!allQuestionsAnswered || isLoading}
              onClick={handleSubmit}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  );
}
