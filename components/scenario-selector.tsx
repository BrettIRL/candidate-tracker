import { useEffect, useState } from 'react';
import { toast } from './ui/use-toast';
import { fetchScenarios } from '@/actions/scenarios';
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
import type { Scenario } from '@/db/schema/assessment';
import { cn } from '@/lib/utils';
import styles from '@/styles/classes.module.css';

interface ScenarioSelectorProps {
  defaultValue?: number | null;
  onChange: (scenarioId: Number | null) => void;
  disabled?: boolean;
}

export function ScenarioSelector({
  defaultValue,
  onChange,
  disabled,
}: ScenarioSelectorProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchScenarios();
      if (result.success) {
        setScenarios(result.data!);
        setIsLoading(false);
      } else {
        toast({
          title: 'Error fetching scenarios',
          description:
            'There was a problem fetching scenarios. Please reload and try again.',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
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
            disabled={isLoading || disabled}
          >
            {defaultValue
              ? scenarios.find(scenario => scenario.id === defaultValue)?.title
              : 'Select Scenario'}
            <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className={cn('p-0', styles.matchPopoverWidthToTrigger)}>
        <Command>
          <CommandInput placeholder="Search scenario..." />
          <CommandEmpty>No scenario found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value="test"
              onSelect={() => {
                onChange(null);
                setPopoverOpen(false);
              }}
            >
              <Icons.check
                className={cn(
                  'mr-2 h-4 w-4',
                  !defaultValue ? 'opacity-100' : 'opacity-0',
                )}
              />
              No Scenario
            </CommandItem>
            {scenarios.map(scenario => (
              <CommandItem
                value={scenario.title}
                key={scenario.id}
                onSelect={() => {
                  onChange(scenario.id);
                  setPopoverOpen(false);
                }}
              >
                <Icons.check
                  className={cn(
                    'mr-2 h-4 w-4',
                    scenario.id === defaultValue ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {scenario.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
