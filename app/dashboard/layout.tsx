import { notFound } from 'next/navigation';
import { MainNav } from '@/components/main-nav';
import { SidebarNav } from '@/components/sidebar-nav';
import { UserAccountNav } from '@/components/user-account-nav';
import { DashboardMainNav, DashboardSidebarNav } from '@/config/dashboard';
import { getCurrentUser } from '@/lib/session';

interface DashboardProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardProps) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={DashboardMainNav} />
          <UserAccountNav user={{ name: user.name, email: user.email }} />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SidebarNav items={DashboardSidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {/* <SiteFooter /> */}
    </div>
  );
}
