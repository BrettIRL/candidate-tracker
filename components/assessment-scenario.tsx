import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface AssessmentScenarioProps {
  scenario: string | null;
}

export function AssessmentScenario({ scenario }: AssessmentScenarioProps) {
  if (!scenario) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question Scenario</CardTitle>
        <CardDescription>
          Read each of the scenarios below and answer the questions that follow
        </CardDescription>
      </CardHeader>
      <CardContent dangerouslySetInnerHTML={{ __html: scenario }}></CardContent>
    </Card>
  );
}
