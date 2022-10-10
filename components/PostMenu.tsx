import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';
import Link from 'next/link';
import { Modal } from './Modal';
import { postsService } from '../services/posts-service';
import { showToast } from '../utils/show-toast';
import { useRouter } from 'next/router';
import { useModal } from '../hooks/use-modal';

interface PostMenuProps {
  id: string;
}

export const PostMenu = ({ id }: PostMenuProps) => {
  // Modal fields
  const { values, actions } = useModal();
  const { isPending, isOpen } = values;
  const { openModal, closeModal, setIsPending } = actions;

  const router = useRouter();

  const deletePost = async () => {
    try {
      setIsPending(true);
      await postsService.deletePost(id);
      showToast('Post deleted', 'success');
      router.push(router.pathname);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsPending(false);
      closeModal();
    }
  };

  return (
    <>
      <Popover className="relative">
        <Popover.Button title="Options">
          <EllipsisHorizontalIcon width={30} height={30} />
        </Popover.Button>

        <Popover.Panel className="absolute right-0 z-10 divide-y flex flex-col gap-3 bg-zinc-100 p-3 rounded border-2 border-black/50 shadow">
          <Link href={`/posts/${id}`}>
            <a className="flex gap-2 items-center justify-between font-semibold p-2 rounded outline-none hover:bg-amber-300/30 focus:bg-amber-300/30 duration-300">
              Open
              <ArrowTopRightOnSquareIcon width={20} height={20} />
            </a>
          </Link>
          <Link href={`/posts/edit/${id}`}>
            <a className="flex gap-2 items-center justify-between font-semibold p-2 rounded outline-none hover:bg-amber-300/30 focus:bg-amber-300/30 duration-300">
              Edit
              <PencilSquareIcon width={20} height={20} />
            </a>
          </Link>

          <button
            onClick={openModal}
            className="flex gap-2 items-center justify-between font-semibold p-2 rounded outline-none hover:bg-amber-300/30 focus:bg-amber-300/30 duration-300"
          >
            Delete
            <TrashIcon width={20} height={20} />
          </button>
        </Popover.Panel>
      </Popover>

      {/* Modal for delete option */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        onCancel={closeModal}
        onConfirm={deletePost}
        pending={isPending}
        title="Delete Post"
        description="Are you sure you want to delete?"
        confirmButtonText="Yes"
        cancelButtonText="No"
      />
    </>
  );
};
