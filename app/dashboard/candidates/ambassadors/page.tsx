import { columns } from './columns';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { getAmbassadors } from '@/db/repositories/ambassadors';

export default async function AmbassadorsPage() {
  const ambassadors = (await getAmbassadors()) || [];

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader
        heading="Ambassadors"
        text="Manage ambassadors to be excluded from future opportunities."
      />
      <DataTable data={ambassadors} columns={columns} filterColumn="name" />
    </div>
  );
}
