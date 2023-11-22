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
import type { Address } from '@/db/schema/addresses';

async function fetchAddresses(): Promise<Address[]> {
  try {
    const response = await fetch('/api/opportunities/address');

    if (!response.ok) {
      const error: { message: string } = await response.json();
      throw new Error(
        `Failed to fetch addresses. Status: ${response.status}. ${error.message}`,
      );
    }

    const addresses = await response.json();
    return addresses;
  } catch (error) {
    toast({
      title: 'Error fetching addresses',
      description:
        'There was a problem fetching addresses. Please reload page and try again',
      variant: 'destructive',
    });
    return [];
  }
}

interface AddressSelectorProps {
  defaultValue?: { id: number };
  onChange: (value: Address) => void;
  disabled?: boolean;
}

export function AddressSelector({
  defaultValue,
  onChange,
  disabled,
}: AddressSelectorProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAddresses();
      setAddresses(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (id: string) => {
    const address = addresses.find(address => address.id.toString() === id);
    if (address) {
      onChange(address);
    }
  };

  return (
    <Select
      onValueChange={handleChange}
      defaultValue={defaultValue?.id.toString()}
      disabled={isLoading || disabled}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select an address" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {addresses.map(address => (
          <SelectItem key={address.id} value={address.id.toString()}>
            {address.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
