import type { MainNavItem, SidebarNavItem } from '@/types';

export const DashboardMainNav: MainNavItem[] = [
  { title: 'Opportunities', href: '/dashboard' },
  { title: 'Candidates', href: '/dashboard/candidates' },
  { title: 'Users', href: '/dashboard/users' },
  { title: 'Settings', href: '/dashboard/settings' },
];

export const DashboardSidebarNav: { [key: string]: SidebarNavItem[] } = {
  '/dashboard': [
    { title: 'Opportunities', href: '/dashboard', icon: 'fileText' },
    { title: 'Users', href: '/dashboard/users', icon: 'user' },
    { title: 'Settings', href: '/dashboard/settigns', icon: 'settings' },
  ],
  '/dashboard/candidates': [
    { title: 'Candidates', href: '/dashboard/candidates', icon: 'users' },
    {
      title: 'Ambassadors',
      href: '/dashboard/candidates/employed',
      icon: 'userCheck',
    },
    {
      title: 'Ex-Ambassadors',
      href: '/dashboard/candidates/former',
      icon: 'userX',
    },
  ],
  '/dashboard/users': [
    { title: 'Users', href: '/dashboard/users', icon: 'users' },
    { title: 'Add User', href: '/dashboard/users/create', icon: 'userPlus' },
  ],
  '/dashboard/settings': [
    {
      title: 'Assessment',
      href: '/dashboard/settings/assement',
      icon: 'flask',
    },
    {
      title: 'Messages',
      href: '/dashboard/settings/messages',
      icon: 'message',
    },
  ],
};
