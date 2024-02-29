'use client';

import { useState } from 'react';
import { AddScenarioDialog } from './add-scenario-dialog';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function AddScenarioButton() {
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setShowAddDialog(true)}>
        <Icons.plus className="mr-2 h-4 w-4" />
        Add Scenario
      </Button>
      <AddScenarioDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </>
  );
}
