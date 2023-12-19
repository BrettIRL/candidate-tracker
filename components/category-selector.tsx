import { useEffect, useState } from 'react';
import { toast } from './ui/use-toast';
import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import type { Category } from '@/db/schema/assessment';

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
    <Select
      onValueChange={categoryId => onChange(+categoryId)}
      defaultValue={defaultValue?.toString()}
      disabled={isLoading || disabled}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {categories.map(category => (
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
