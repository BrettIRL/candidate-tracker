import { Fragment } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function PageSkeleton() {
  return (
    <Fragment>
      <Skeleton className="mb-4 h-4 w-[320px]" />
      <Skeleton className="mb-4 h-32" />
      <Skeleton className="mb-4 h-4 w-[240px]" />
      <Skeleton className="mb-4 h-4 w-[800px]" />
      <Skeleton className="mb-4 h-4 w-[680px]" />
      <Skeleton className="mb-4 h-4 w-[720px]" />
    </Fragment>
  );
}
