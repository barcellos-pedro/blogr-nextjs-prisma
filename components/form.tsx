import {
  CloudArrowDownIcon,
  ExclamationCircleIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { FormEvent } from 'react';
import { CreationStatus } from '../types/creation-status';
import { ToggleButton } from './ToggleButton';

interface FormProps {
  onSubmit: (event: FormEvent) => void;
  isPublished: boolean;
  onPublishedChange: () => void;
  submittingStatus?: CreationStatus;
  data?: { title: string; content: string; published: boolean };
}

export const Form = ({
  onSubmit,
  isPublished,
  onPublishedChange,
  submittingStatus,
  data,
}: FormProps) => {
  return (
    <form className="mt-5 mb-12 flex flex-col gap-5" onSubmit={onSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="p-2 rounded"
          defaultValue={data?.title || ''}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="content" className="font-semibold">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          cols={30}
          rows={10}
          className="p-3 rounded"
          defaultValue={data?.content || ''}
        ></textarea>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <ToggleButton
          id="publish"
          label="Publish ?"
          checked={data?.published || isPublished}
          onChange={onPublishedChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-10">
          <button
            type="submit"
            className="bg-orange-500 text-white rounded px-8 h-12 hover:bg-orange-600"
          >
            {data?.title ? 'Update' : 'Create'}
          </button>
          {data?.title && (
            <button
              type="submit"
              className="bg-red-500 text-white rounded px-8 h-12 hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>

        {submittingStatus === CreationStatus.CREATING && (
          <p className="flex gap-2">
            <CloudArrowDownIcon
              className="animate-pulse"
              width={25}
              height={25}
            />
            Saving...
          </p>
        )}

        {submittingStatus === CreationStatus.SUCCESS && (
          <p className="flex gap-2">
            <HandThumbUpIcon width={25} height={25} />
            Post created!
          </p>
        )}

        {submittingStatus === CreationStatus.ERROR && (
          <p className="flex gap-2">
            <ExclamationCircleIcon width={25} height={25} />
            Error creating the post. Try again.
          </p>
        )}
      </div>
    </form>
  );
};
