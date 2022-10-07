import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';
import Link from 'next/link';

interface PostMenuProps {
  id: string;
}

export const PostMenu = ({ id }: PostMenuProps) => {
  return (
    <Popover className="relative">
      <Popover.Button title="Options">
        <EllipsisHorizontalIcon width={30} height={30} />
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-10 divide-y flex flex-col gap-3 bg-zinc-200 p-3 rounded border-2 border-black/5 shadow">
        <Link href={`posts/${id}`}>
          <a className="flex gap-2 items-center justify-between font-semibold p-2 rounded outline-none hover:bg-amber-300/30 focus:bg-amber-300/30 duration-300">
            Open
            <ArrowTopRightOnSquareIcon width={20} height={20} />
          </a>
        </Link>
        <Link href={`posts/${id}/edit`}>
          <a className="flex gap-2 items-center justify-between font-semibold p-2 rounded outline-none hover:bg-amber-300/30 focus:bg-amber-300/30 duration-300">
            Edit
            <PencilSquareIcon width={20} height={20} />
          </a>
        </Link>
        <button className="flex gap-2 items-center justify-between font-semibold p-2 rounded outline-none hover:bg-amber-300/30 focus:bg-amber-300/30 duration-300">
          Delete
          <TrashIcon width={20} height={20} />
        </button>
      </Popover.Panel>
    </Popover>
  );
};
