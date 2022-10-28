import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { Session } from 'next-auth';
import { useProgressBar } from '../hooks/use-progressbar';
import 'react-toastify/dist/ReactToastify.css';
import '../public/global.css';
import 'nprogress/nprogress.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  useProgressBar();

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
}
