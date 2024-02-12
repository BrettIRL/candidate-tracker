import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AssessmentQuestionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="mb-2 h-4 w-[400px]" />
        <Skeleton className="h-4 w-[200px]" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 md:grid-cols-2">
          {[...Array(4)].map(el => (
            <Skeleton key={el} className="h-8" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
