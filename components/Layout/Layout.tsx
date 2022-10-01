import Link from 'next/link';
import React, { HTMLAttributes, ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  home?: boolean;
  children: ReactNode;
}

export const Layout = ({ home = false, children, ...divAttrs }: LayoutProps) => {
  return (
    <div className={styles.layout} {...divAttrs}>
      {children}
      {!home && (
        <Link href="/">
          <a className={styles.backToHome}>&larr; Back to home</a>
        </Link>
      )}
    </div>
  );
};
