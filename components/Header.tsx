import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();
  const isActive = (path: string) =>
    router.pathname === path ? 'text-zinc-500 ' : 'text-black';

  return (
    <nav className='mb-7'>
      <header>
        <Link href="/">
          <a className={` font-bold ${isActive('/')}`}>Feed</a>
        </Link>
      </header>
    </nav>
  );
};

export default Header;
