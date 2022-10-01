import React, { HTMLAttributes, ReactNode } from 'react';
import { BackToHome } from './BackToHome';

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
    <div className="p-10 h-screen bg-home" {...divAttrs}>
      {children}
      {!home && <BackToHome />}
    </div>
  );
};
