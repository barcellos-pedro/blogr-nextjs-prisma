import Head from 'next/head';
import React, { HTMLAttributes, ReactNode } from 'react';
import { ogURL } from '../utils/og-url';
import { BackToHome } from './BackToHome';
import { Header } from './Header';

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  home?: boolean;
  children: ReactNode;
}

export const Layout = ({
  home = false,
  children,
  ...divAttrs
}: LayoutProps) => {
  return (
    <main className="p-10 bg-home" {...divAttrs}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content="Stories" />
        <meta name="og:site_name" content="Stories" />
        <meta name="og:description" content="Register stories you care ❤️" />
        <meta name="og:image" content={ogURL} />
      </Head>

      <Header />

      {children}

      {!home && (
        <footer>
          <BackToHome />
        </footer>
      )}
    </main>
  );
};
