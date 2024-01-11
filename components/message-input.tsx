'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { characterCount } from '@/lib/message';

const MAX_LENGTH = 160;
const WARNING_LENGTH = 120;

async function saveMessage(name: string, message: string) {
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
        `Failed to save message. Status: ${response.status}. ${error.message}`,
      );
    }
  } catch (error) {
    toast({
      title: 'Error Saving Message',
      description: 'Message was not saved. Please try again.',
      variant: 'destructive',
    });
  }
}

interface MessageInputProps {
  name: string;
  value?: string;
}

export function MessageInput({ name, value }: MessageInputProps) {
  const [message, setMessage] = useState<string>(value || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (characterCount(value) <= MAX_LENGTH) {
      setMessage(value);
    }
  };

  const handleSave = async () => {
    if (characterCount(message) <= MAX_LENGTH) {
      setIsLoading(true);
      await saveMessage(name, message);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid w-full gap-4">
      <div className="relative">
        <Textarea
          rows={5}
          className="resize-none"
          onChange={handleChange}
          value={message}
          disabled={isLoading}
        />
        <p
          className={`absolute bottom-1 right-2 text-right text-xs ${
            message.length > WARNING_LENGTH
              ? 'text-red-500'
              : 'text-muted-foreground'
          }`}
        >
          {characterCount(message)}/{MAX_LENGTH}
        </p>
      </div>
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
