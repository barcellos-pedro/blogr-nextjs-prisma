import Head from 'next/head';
import React, { HTMLAttributes, ReactNode } from 'react';
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
        <meta
          name="description"
          content="Register all the stories you care ❤️"
        />
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
