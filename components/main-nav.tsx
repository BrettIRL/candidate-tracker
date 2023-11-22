'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icons } from '@/components/icons';
import { MobileNav } from '@/components/mobile-nav';
import { MainNavItem } from '@/ts/types';

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href={process.env.NEXT_PUBLIC_AUTHENTICATED_REDIRECT || '/'}
        className="hidden items-center space-x-2 md:flex"
      >
        <Icons.logo />
      </Link>
      {items ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center text-lg font-medium text-foreground transition-colors hover:text-foreground/80 sm:text-sm"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        {/* <span className="font-bold">Menu</span> */}
      </button>
      {showMobileMenu && items && <MobileNav items={items} />}
    </div>
  );
}
