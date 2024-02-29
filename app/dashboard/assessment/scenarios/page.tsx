import { columns } from './columns';
import { AddScenarioButton } from '@/components/add-scenario-button';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { getScenarios } from '@/db/repositories/assessments';

export default async function ScenariosPage() {
  const scenarios = (await getScenarios()) || [];

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader
        heading="Scenarios"
        text="Create and manage assessment scenarios"
      >
        <AddScenarioButton />
      </DashboardHeader>
      <DataTable data={scenarios} columns={columns} filterColumn="title" />
    </div>
  );
}
