import { AddOpportunityForm } from '@/components/add-opportunity-form';
import { DashboardHeader } from '@/components/dashboard-header';

export default function UserCreatePage() {
  return (
    <div className="grid items-start gap-8 px-[1px] lg:max-w-2xl">
      <DashboardHeader
        heading="Create Opportunity"
        text="Create SA Youth opportunity"
      />
      <AddOpportunityForm />
    </div>
  );
}
