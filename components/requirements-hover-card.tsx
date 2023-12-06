import { Icons } from '@/components/icons';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { OpportunityToCandidate } from '@/db/schema/candidates';

interface RequirementsHoverCardProps {
  count: number;
  row: OpportunityToCandidate;
}

export function RequirementsHoverCard({
  count,
  row,
}: RequirementsHoverCardProps) {
  const CheckIcon = <Icons.check className="mr-1 h-4 w-4 text-green-500" />;
  const CrossIcon = <Icons.close className="mr-1 h-4 w-4 text-red-500" />;

  return (
    <HoverCard>
      <HoverCardTrigger className="flex cursor-pointer items-center">
        {count > 6 ? (
          <Icons.open className="mr-2 h-4 w-4 text-green-500" />
        ) : count < 1 ? (
          <Icons.closed className="mr-2 h-4 w-4 text-red-500" />
        ) : (
          <Icons.slash className="mr-2 h-4 w-4 text-yellow-500" />
        )}
        {count}
      </HoverCardTrigger>
      <HoverCardContent>
        {/* <RequirementsList row={row} /> */}
        <ul className="space-y-1">
          {['Age', 'Gender', 'Race', 'Disability', 'Education', 'Language'].map(
            criteria => (
              <li key={criteria} className="flex items-center">
                {row[`meets${criteria}` as keyof OpportunityToCandidate]
                  ? CheckIcon
                  : CrossIcon}
                {criteria}
              </li>
            ),
          )}
          <li className="flex items-center">
            {+row.distance < 20 ? CheckIcon : CrossIcon}Distance
          </li>
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
