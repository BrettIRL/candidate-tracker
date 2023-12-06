import { Icons } from '@/components/icons';

export * from '@/ts/types/candidate';
export * from '@/ts/types/opportunity';

export type MainNavItem = {
  title: string;
  href: string;
};

export type SidebarNavItem = {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
};
