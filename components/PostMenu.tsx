import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Dialog, Popover } from '@headlessui/react';
import Link from 'next/link';
import { useState } from 'react';

interface PostMenuProps {
  id: string;
}

export const PostMenu = ({ id }: PostMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const deletePost = () => {};

  return (
    <>
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
          <Link href={`posts/edit/${id}`}>
            <a className="flex gap-2 items-center justify-between font-semibold p-2 rounded outline-none hover:bg-amber-300/30 focus:bg-amber-300/30 duration-300">
              Edit
              <PencilSquareIcon width={20} height={20} />
            </a>
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="flex gap-2 items-center justify-between font-semibold p-2 rounded outline-none hover:bg-amber-300/30 focus:bg-amber-300/30 duration-300"
          >
            Delete
            <TrashIcon width={20} height={20} />
          </button>
        </Popover.Panel>
      </Popover>

      {/* TODO: Create dialog component with props */}
      <Dialog
        className="relative z-50"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <Dialog.Panel className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 rounded-lg bg-white p-12 shadow-md shadow-black/50">
          <Dialog.Title className="text-center font-semibold text-zinc-600">
            Delete Post
          </Dialog.Title>
          <Dialog.Description className="text-center">
            Are you sure you want to delete?
          </Dialog.Description>
          <div className="flex justify-center gap-5">
            <button
              onClick={deletePost}
              className="font-semibold bg-red-500 px-4 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="font-semibold bg-white px-4 py-1 rounded border-2 border-zinc-300"
            >
              No
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
