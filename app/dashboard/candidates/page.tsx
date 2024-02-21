import { DashboardHeader } from '@/components/dashboard-header';

export default function CandidatesPage() {
  return (
    <div className="grid items-start gap-8">
      <DashboardHeader
        heading="Candidates"
        text="View and manage all candidates"
      />
    </div>
  );
}
