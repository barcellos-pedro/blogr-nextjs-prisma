import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { isActiveLink } from '../utils/active-link';
import Image from 'next/image';

interface UserData {
  name?: string;
  email?: string;
  image?: string;
}

interface LoggedInLinksProps {
  user: UserData;
}

export const LoggedInLinks = ({ user }: LoggedInLinksProps) => {
  const router = useRouter();

  return (
    <>
      <Link href="/">
        <a className={`font-bold ${isActiveLink(router, '/')}`}>Feed</a>
      </Link>

      <div className="flex items-center flex-wrap gap-7">
        <Image width={50} height={50} src={user.image} className='rounded-full' />
        <p>
          {user.name} {'\u2022'} {user.email}
        </p>
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
