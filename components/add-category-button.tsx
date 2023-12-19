'use client';

import { useState } from 'react';
import { AddCategoryDialog } from '@/components/add-category-dialog';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function AddCategoryButton() {
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setShowAddDialog(true)}>
        <Icons.plus className="mr-2 h-4 w-4" />
        Add Category
      </Button>
      <AddCategoryDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </>
  );
}
