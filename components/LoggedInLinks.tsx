import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { Popover } from '@headlessui/react';
import {
  PencilSquareIcon,
  BookOpenIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

interface UserData {
  name?: string;
  email?: string;
  image?: string;
}

interface LoggedInLinksProps {
  user: UserData;
}

export const LoggedInLinks = ({ user }: LoggedInLinksProps) => {
  return (
    <>
      <Link href="/">
        <a className="font-bold">Feed</a>
      </Link>

      <Popover className="relative">
        <Popover.Button className="ring ring-transparent rounded-full outline-none focus:ring-zinc-400 hover:ring-zinc-400 duration-300">
          <Image
            width={50}
            height={50}
            src={user.image}
            className="rounded-full"
          />
        </Popover.Button>
        <Popover.Panel className="absolute mt-2 right-0 flex flex-col bg-white rounded p-4 shadow shadow-zinc-400 ">
          <p className="text-center w-full font-semibold">{user.name}</p>
          <p className="text-zinc-500">{user.email}</p>
          <hr className="w-10/12 mx-auto my-4 border-black" />
          <div className="flex flex-col gap-3">
            <Link href="/drafts">
              <a className="outline-none p-2 flex gap-2 hover:bg-sky-200 rounded duration-300 focus:bg-sky-200">
                <PencilSquareIcon width={20} height={20} />
                My drafts
              </a>
            </Link>
            <Link href="/create">
              <a className="outline-none p-2 flex gap-2 hover:bg-sky-200 rounded duration-300 focus:bg-sky-200">
                <BookOpenIcon width={20} height={20} />
                Create
              </a>
            </Link>
            <button
              className="outline-none p-2 flex gap-2 hover:bg-sky-200 rounded duration-300 focus:bg-sky-200"
              onClick={() => signOut()}
            >
              <ArrowLeftOnRectangleIcon width={20} height={20} />
              Log out
            </button>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
};
