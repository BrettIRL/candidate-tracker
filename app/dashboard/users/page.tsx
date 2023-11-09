import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { getUsers } from '@/db/respositories/users';

export default async function UsersPage() {
  const users = (await getUsers()) || [];

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="pb-1 text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage users and user roles.</p>
        </div>
      </div>
      <DataTable data={users} columns={columns} />
    </div>
  );
}
