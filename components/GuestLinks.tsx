import Link from 'next/link';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export const GuestLinks = () => {
  return (
    <>
      <Link href="/">
        <a className="font-bold">Feed</a>
      </Link>

      <Link href="/login">
        <a className="flex gap-2 items-center font-bold hover:underline underline-offset-4">
          Log in
          <ArrowRightOnRectangleIcon width={20} height={20} />
        </a>
      </Link>
    </>
  );
};
