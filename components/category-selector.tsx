import { useEffect, useState } from 'react';
import { toast } from './ui/use-toast';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/db/schema/assessment';
import { cn } from '@/lib/utils';
import styles from '@/styles/classes.module.css';

async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/assessments/category');

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to fetch categories. Status: ${response.status}. ${error.message}`,
      );
    }

    const categories = await response.json();
    return categories;
  } catch (error) {
    toast({
      title: 'Error fetching categories',
      description:
        'There was a problem fetching categories. Please reloed page and try again',
      variant: 'destructive',
    });
    return [];
  }
}

interface CategorySelectorProps {
  defaultValue?: number;
  onChange: (categoryId: Number) => void;
  disabled?: boolean;
}

export function CategorySelector({
  defaultValue,
  onChange,
  disabled,
}: CategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategories();
      setCategories(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              'w-full justify-between',
              !defaultValue && 'text-muted-foreground',
            )}
          >
            {defaultValue
              ? categories.find(cat => cat.id === defaultValue)?.name
              : 'Select language'}
            <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className={cn('p-0', styles.matchPopoverWidthToTrigger)}>
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {categories.map(category => (
              <CommandItem
                value={category.name}
                key={category.id}
                onSelect={() => {
                  onChange(category.id);
                  setPopoverOpen(false);
                }}
              >
                <Icons.check
                  className={cn(
                    'mr-2 h-4 w-4',
                    category.id === defaultValue ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
