import { Icons } from '@/components/icons';

export type MainNavItem = {
  title: string;
  href: string;
};

export type SidebarNavItem = {
  title: string;
  href: string;
  icon?: keyof typeof Icons;
};
