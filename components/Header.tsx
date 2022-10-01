import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();
  const isActive = (path: string) =>
    router.pathname === path ? 'text-zinc-500 ' : 'text-black';

  return (
    <header className="mb-7">
      <nav>
        <Link href="/">
          <a className={`font-bold ${isActive('/')}`}>Feed</a>
        </Link>
      </nav>
    </header>
  );
};
