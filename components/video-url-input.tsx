'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

async function saveVideo(name: string, message: string) {
  try {
    const response = await fetch('/api/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, value: message }),
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to save video url. Status: ${response.status}. ${error.message}`,
      );
    }
  } catch (error) {
    toast({
      title: 'Error Saving Video Url',
      description: 'Video url was not saved. Please try again.',
      variant: 'destructive',
    });
  }
}

interface OverviewVideoInputProps {
  name: string;
  value?: string;
}

export function VideoUrlInput({ name, value }: OverviewVideoInputProps) {
  const [video, setVideo] = useState<string>(value || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo(e.target.value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await saveVideo(name, video);
    setIsLoading(false);
  };

  return (
    <div className="grid w-full gap-4">
      <Input onChange={handleChange} value={video} disabled={isLoading} />
      <Button
        size="sm"
        className="justify-self-end"
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Save
      </Button>
    </div>
  );
}
