import { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import type { AssessmentQuestion } from '@/ts/types';
import styles from '@/styles/classes.module.css';

interface AssessmentQuestionProps {
  question: AssessmentQuestion;
  answer: number | undefined;
  onSelect: (questionId: number, answer: number) => void;
}

export function AssessmentQuestion({
  question,
  answer,
  onSelect,
}: AssessmentQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(
    answer,
  );

  const handleAnswerSelect = (answerId: number) => {
    setSelectedAnswer(selectedAnswer === answerId ? undefined : answerId);
    onSelect(question.id, answerId);
  };

  return (
    <Card>
      <CardHeader
        className={styles.question}
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <CardContent>
        <div className="grid gap-2 md:grid-cols-2">
          {question.answers.map(answer => (
            <Button
              key={answer.id}
              variant={selectedAnswer === answer.id ? 'default' : 'outline'}
              onClick={() => handleAnswerSelect(answer.id)}
            >
              {selectedAnswer === answer.id && (
                <Icons.checkSquare className="mr-2 h-4 w-4" />
              )}
              {answer.answer}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
