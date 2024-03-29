import Link from 'next/link';
import { Icons } from '@/components/icons';
import { MainNavItem } from '@/ts/types';

interface MobileNavProps {
  items: MainNavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  return (
    <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-0 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link
          href={process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT || '/'}
          className="flex items-center space-x-2"
        >
          <Icons.logo />
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
