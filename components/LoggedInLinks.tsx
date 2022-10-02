import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { isActiveLink } from '../utils/active-link';

export const LoggedInLinks = () => {
  const router = useRouter();

  return (
    <>
      <Link href="/">
        <a className={`font-bold ${isActiveLink(router, '/')}`}>Feed</a>
      </Link>

      <div className="flex flex-wrap gap-7">
        <p>Pedro Reis {'\u2022'} pedro@gmail.com</p>
        <Link href="/drafts">
          <a className={`${isActiveLink(router, '/drafts')}`}>My drafts</a>
        </Link>
        <Link href="/create">
          <a>Create</a>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    </>
  );
};
