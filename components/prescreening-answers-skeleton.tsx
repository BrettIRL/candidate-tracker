import { Skeleton } from '@/components/ui/skeleton';

export function PrescreeningAnswersSkeleton() {
  return (
    <>
      <div>
        <Skeleton className="mb-2 h-6 w-60" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div>
        <Skeleton className="mb-2 h-6 w-96" />
        <Skeleton className="h-4" />
      </div>
      <div>
        <Skeleton className="mb-2 h-6 w-48" />
        <Skeleton className="h-4 w-40" />
      </div>
    </>
  );
}
