export type AssessmentQuestion = {
  id: number;
  question: string;
  category: string;
  answers: AssessmentAnswer[];
};

type AssessmentAnswer = {
  id: number;
  answer: string;
  correct: boolean;
};

export type QuestionsByCategory = {
  [category: string]: AssessmentQuestion[];
};

export type EvaluationQuestion = {
  id: number;
  answers: EvaluationAnswer[];
};

type EvaluationAnswer = {
  id: number;
  weight: number;
};
