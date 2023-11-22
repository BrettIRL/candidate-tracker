import { AddUserForm } from '@/components/add-user-form';
import { DashboardHeader } from '@/components/dashboard-header';

export default function UserCreatePage() {
  return (
    <div className="grid items-start gap-8 px-[1px] lg:max-w-2xl">
      <DashboardHeader heading="Add User" text="Add new system users." />
      <AddUserForm />
    </div>
  );
}
