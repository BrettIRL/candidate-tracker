'use client';

import { useEffect, useState } from 'react';
import { PageSkeleton } from './page-skeleton';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export function AssessmentComplete() {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result: { success: boolean; settings?: Record<string, string> } =
        await fetchSettings();
      if (result.success) {
        setContent(result.settings!['assessment-complete']);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="col-span-full flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Complete</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <PageSkeleton />}
          <div
            className={cn('mb-4', styles.page)}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
