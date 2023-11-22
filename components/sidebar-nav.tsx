'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { getNavItemsForPath } from '@/lib/path';
import { cn } from '@/lib/utils';
import type { SidebarNavItem } from '@/ts/types';

interface SidebarNavProps {
  items: { [key: string]: SidebarNavItem[] };
}

export function SidebarNav({ items }: SidebarNavProps) {
  const path = usePathname();
  const pathItems = getNavItemsForPath(items, path);

  if (!pathItems.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {pathItems.map((item, idx) => {
        const Icon = Icons[item.icon || 'arrowRight'];
        return (
          <Link key={idx} href={item.href}>
            <span
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                path === item.href ? 'bg-accent' : 'transparent',
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
