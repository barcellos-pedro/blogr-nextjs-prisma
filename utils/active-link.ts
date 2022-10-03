import { NextRouter } from 'next/router';

export const isActiveLink = (
  router: NextRouter,
  path: string,
  activeColor: string = 'text-zinc-500 font-bold',
  defaultColor: string = 'text-black'
) => {
  return router.pathname === path ? activeColor : defaultColor;
};
