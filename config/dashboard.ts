import type { MainNavItem, SidebarNavItem } from '@/ts/types';

export const DashboardMainNav: MainNavItem[] = [
  { title: 'Opportunities', href: '/dashboard' },
  { title: 'Candidates', href: '/dashboard/candidates' },
  { title: 'Assessment', href: '/dashboard/assessment' },
  { title: 'Users', href: '/dashboard/users' },
  { title: 'Settings', href: '/dashboard/settings/messages' },
];

export const DashboardSidebarNav: { [key: string]: SidebarNavItem[] } = {
  '/dashboard': [
    { title: 'Opportunities', href: '/dashboard', icon: 'fileText' },
    {
      title: 'Create Opportunity',
      href: '/dashboard/opportunities/create',
      icon: 'filePlus',
    },
    {
      title: 'Addresses',
      href: '/dashboard/opportunities/addresses',
      icon: 'building',
    },
  ],
  '/dashboard/candidates': [
    { title: 'Candidates', href: '/dashboard/candidates', icon: 'users' },
    {
      title: 'Ambassadors',
      href: '/dashboard/candidates/ambassadors',
      icon: 'userCheck',
    },
  ],
  '/dashboard/assessment': [
    { title: 'Questions', href: '/dashboard/assessment', icon: 'question' },
    {
      title: 'Create Question',
      href: '/dashboard/assessment/create',
      icon: 'filePlus',
    },
    {
      title: 'Categories',
      href: '/dashboard/assessment/categories',
      icon: 'folderClosed',
    },
    {
      title: 'Scenarios',
      href: '/dashboard/assessment/scenarios',
      icon: 'scenario',
    },
  ],
  '/dashboard/users': [
    { title: 'Users', href: '/dashboard/users', icon: 'users' },
    { title: 'Add User', href: '/dashboard/users/create', icon: 'userPlus' },
  ],
  '/dashboard/settings': [
    {
      title: 'Assessment',
      href: '/dashboard/settings/assessment',
      icon: 'question',
    },
    {
      title: 'Messages',
      href: '/dashboard/settings/messages',
      icon: 'message',
    },
  ],
};
