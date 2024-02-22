import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { getSAYOpportunityUrl } from '@/actions/opportunity';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

interface OpportunityUrlDialogProps {
  providerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OpportunityUrlDialog({
  providerId,
  open,
  onOpenChange,
}: OpportunityUrlDialogProps) {
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      (async () => {
        setIsLoading(true);
        const result = await getSAYOpportunityUrl(providerId);
        if (result.success) {
          setUrl(result.data!.url || 'No URL found');
        } else {
          toast({
            title: 'Error retrieving URL',
            description:
              'There was a problem retrieving the URL from SA Youth. Please try again.',
            variant: 'destructive',
          });
        }
        setIsLoading(false);
      })();
    }
  }, [open, providerId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>SA Youth Opportunity URL</DialogTitle>
        </DialogHeader>
        <Separator />
        <div>
          {isLoading ? (
            <Skeleton className="h-9" />
          ) : (
            <Input value={url} autoFocus={true} readOnly />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
