import { columns } from './columns';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { getUsers } from '@/db/repositories/users';

export default async function UsersPage() {
  const users = (await getUsers()) || [];

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader heading="Users" text="Manage users and user roles" />
      <DataTable data={users} columns={columns} filterColumn="name" />
    </div>
  );
}
