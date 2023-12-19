import { columns } from './columns';
import { AddCategoryButton } from '@/components/add-category-button';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { getCategories } from '@/db/repositories/assessments';

export default async function CategoriesPage() {
  const categories = (await getCategories()) || [];

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader
        heading="Categories"
        text="Create and manage assessment categories"
      >
        <AddCategoryButton />
      </DashboardHeader>
      <DataTable data={categories} columns={columns} filterColumn="name" />
    </div>
  );
}
