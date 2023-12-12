import { Button } from '@/components/ui/button';
import { candidateSteps } from '@/lib/mappings';

interface CandidateStepSelectorProps {
  onStepChange: (step: number) => void;
}

export function CandidateStepSelector({
  onStepChange,
}: CandidateStepSelectorProps) {
  return (
    <div className="space-x-2">
      {Object.keys(candidateSteps).map(step => (
        <Button
          key={step}
          size="sm"
          variant="outline"
          onClick={() => onStepChange(+step)}
        >
          {candidateSteps[+step]}
        </Button>
      ))}
    </div>
  );
}
