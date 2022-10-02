import Link from 'next/link';
import { useRouter } from 'next/router';
import { isActiveLink } from '../utils/active-link';

export const GuestLinks = () => {
  const router = useRouter();

  return (
    <>
      <Link href="/">
        <a className={`font-bold ${isActiveLink(router, '/')}`}>Feed</a>
      </Link>

      <Link href="/api/auth/signin">
        <a className={`font-bold ${isActiveLink(router, '/signup')}`}>Log in</a>
      </Link>
    </>
  );
};
