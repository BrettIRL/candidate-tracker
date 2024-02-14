'use client';

import { useState } from 'react';
import { RichTextEditor } from './ui/rich-text-editor';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const savePageContent = async (name: string, content: string) => {
  try {
    const response = await fetch('/api/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, value: content }),
    });

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to save page. Status: ${response.status}. ${error.message}`,
      );
    }
  } catch (error) {
    toast({
      title: 'Error Saving Page',
      description: 'Page was not saved. Please try again.',
      variant: 'destructive',
    });
  }
};

interface PageEditorProps {
  name: string;
  value?: string;
}

export function PageEditor({ name, value }: PageEditorProps) {
  const [page, setPage] = useState<string>(value || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setPage(value);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await savePageContent(name, page);
    setIsLoading(false);
  };

  return (
    <div className="grid w-full gap-4">
      <RichTextEditor
        initialValue={value}
        onChange={handleChange}
        readonly={isLoading}
      />
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
