import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './Header.module.css';

type HeaderProps = {
  title?: string;
};

export const Header = ({ title = 'Home' }: HeaderProps) => {
  const router = useRouter();

  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <nav className={style.nav}>
      <header className={style.left}>
        <Link href="/">
          <a className={style.bold} data-active={isActive('/')}>
            <h1>{title}</h1>
          </a>
        </Link>
      </header>
    </nav>
  );
};

export default Header;
