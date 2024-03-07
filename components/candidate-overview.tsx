import { useEffect, useState } from 'react';
import { PageSkeleton } from './page-skeleton';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import styles from '@/styles/classes.module.css';

async function fetchSettings() {
  try {
    const response = await fetch('/api/settings');
    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to fetch settings. Status: ${response.status}. ${error.message}`,
      );
    }

    const result = await response.json();
    return { success: true, settings: result.settings };
  } catch (error) {
    toast({
      title: 'Problem loading page',
      description: 'Please reload and try again',
      variant: 'destructive',
    });
    return { success: false };
  }
}

interface CandidateOverviewProps {
  onClick: () => void;
}

export function CandidateOverview({ onClick }: CandidateOverviewProps) {
  const [content, setContent] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result: { success: boolean; settings?: Record<string, string> } =
        await fetchSettings();
      if (result.success) {
        setContent(result.settings!['assessment-overview']);
        setVideoUrl(result.settings!['assessment-overview-video']);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="col-span-full flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Position Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <PageSkeleton />}
          <div
            className={cn('mb-4', styles.page)}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {videoUrl && (
            <iframe
              src={videoUrl}
              className="mt-8 aspect-video w-full max-w-[720px]"
              allowFullScreen
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={onClick}>I understand, continue</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
