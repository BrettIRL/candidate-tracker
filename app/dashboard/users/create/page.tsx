import { AddUserForm } from '@/components/add-user-form';

export default function UserCreatePage() {
  return (
    <div className="grid items-start gap-8 px-[1px] lg:max-w-2xl">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h1 className="pb-1 text-3xl font-bold tracking-tight">Add User</h1>
          <p className="text-muted-foreground">Add new system users.</p>
        </div>
      </div>
      <AddUserForm />
    </div>
  );
}
