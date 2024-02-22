import { columns } from './columns';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { getCandidates } from '@/db/repositories/candidates';

export default async function CandidatesPage() {
  const candidates = (await getCandidates()) || [];

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader
        heading="Candidates"
        text="View and manage all candidates"
      />
      <DataTable data={candidates} columns={columns} filterColumn="name" />
    </div>
  );
}
