import { columns } from './columns';
import { AddAddressButton } from '@/components/add-address-button';
import { DashboardHeader } from '@/components/dashboard-header';
import { DataTable } from '@/components/data-table';
import { getAddresses } from '@/db/repositories/addresses';

export default async function Addresses() {
  const addresses = (await getAddresses()) || [];

  return (
    <div className="grid items-start gap-8">
      <DashboardHeader
        heading="Addresses"
        text="Create and manage opportunity addresses"
      >
        <AddAddressButton />
      </DashboardHeader>
      <DataTable data={addresses} columns={columns} filterColumn="name" />
    </div>
  );
}
