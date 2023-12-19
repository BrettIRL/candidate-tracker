import { AddQuestionForm } from '@/components/add-question-form';
import { DashboardHeader } from '@/components/dashboard-header';

export default function AssessmentCreatePage() {
  return (
    <div className="grid items-start gap-8 px-[1px] lg:max-w-2xl">
      <DashboardHeader
        heading="Add Question"
        text="Add new assessment question"
      />
      <AddQuestionForm />
    </div>
  );
}
