import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import './global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
