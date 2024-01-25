import { columns } from './columns';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { getQuestions } from '@/db/repositories/assessments';

export default async function AssessmentsPage() {
  const questions = (await getQuestions()) || [];

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader heading="Questions" text="Manage Assessment Questions" />
      <DataTable
        data={questions}
        columns={columns}
        facetFilters={['category']}
        filterColumn="question"
      />
    </div>
  );
}
