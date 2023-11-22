'use client';

import { useState } from 'react';
import { AddAddressDialog } from './add-address-dialog';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function AddAddressButton() {
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setShowAddDialog(true)}>
        <Icons.plus className="mr-2 h-4 w-4" />
        Add Address
      </Button>
      <AddAddressDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </>
  );
}
