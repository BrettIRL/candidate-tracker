import { DashboardHeader } from '@/components/dashboard-header';
import { CandidateImportButton } from '@/components/ui/candidate-import-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getCandidatesForOpportunity } from '@/db/repositories/candidates';

interface OpportunityCandidatesProps {
  params: {
    opportunityId: string;
  };
}

export default async function OpportunityCandidates({
  params,
}: OpportunityCandidatesProps) {
  const data = await getCandidatesForOpportunity(+params.opportunityId);

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader heading="Candidates" text="Manage candidates">
        <CandidateImportButton opportunityId={params.opportunityId} />
      </DashboardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Step</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.candidates.idNumber}>
              <TableCell>
                {row.candidates.firstName} {row.candidates.lastName}
              </TableCell>
              <TableCell>{row.opportunities_to_candidates.step}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
