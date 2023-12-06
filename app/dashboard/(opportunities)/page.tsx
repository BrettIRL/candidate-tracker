import { columns } from './columns';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { getOpportunities } from '@/db/repositories/opportunities';

export default async function OpportunitiesPage() {
  const opportunities = (await getOpportunities()) || [];

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader heading="Opportunities" text="Manage opportunities" />
      <DataTable data={opportunities} columns={columns} filterColumn="title" />
    </div>
  );
}
