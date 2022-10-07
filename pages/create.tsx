import Head from 'next/head';
import { Layout } from '../components/Layout';
import {
  CloudArrowDownIcon,
  ExclamationCircleIcon,
  HandThumbUpIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { Unauthorized } from '../components/Unauthorized';
import { FormEvent, useState } from 'react';
import { postsService } from '../services/posts-service';

enum CreationStatus {
  NOT_STARTED,
  CREATING,
  SUCCESS,
  ERROR,
}

export default function CreatePage() {
  const { NOT_STARTED, CREATING, SUCCESS, ERROR } = CreationStatus;
  const { status } = useSession();

  const [creationStatus, setCreationStatus] =
    useState<CreationStatus>(NOT_STARTED);

  const getFormData = (event: FormEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    return Object.fromEntries(formData);
  };

  const createEvent = async (event: FormEvent) => {
    setCreationStatus(CREATING);
    event.preventDefault();

    try {
      const data = getFormData(event);
      const response = await postsService.createPost(data);
      console.log(response);
      setCreationStatus(SUCCESS);
    } catch (error) {
      console.error(error);
      setCreationStatus(ERROR);
    } finally {
      setTimeout(() => {
        setCreationStatus(NOT_STARTED);
      }, 3000);
    }
  };

  if (status === 'unauthenticated') {
    return <Unauthorized />;
  }

  return (
    <Layout>
      <Head>
        <title>Blog - Create</title>
      </Head>

      <h1 className="text-2xl font-bold">New draft</h1>

      <form className="my-5 flex flex-col gap-5" onSubmit={createEvent}>
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <input type="text" id="title" name="title" className="p-2 rounded" />
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
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-orange-500 text-white rounded px-8 h-12 hover:bg-orange-600"
          >
            Create
          </button>

          {creationStatus === CREATING && (
            <p className="flex gap-2">
              <CloudArrowDownIcon
                className="animate-pulse"
                width={25}
                height={25}
              />
              Saving...
            </p>
          )}

          {creationStatus === SUCCESS && (
            <p className="flex gap-2">
              <HandThumbUpIcon width={25} height={25} />
              Post created!
            </p>
          )}

          {creationStatus === ERROR && (
            <p className="flex gap-2">
              <ExclamationCircleIcon width={25} height={25} />
              Error creating the post. Try again.
            </p>
          )}
        </div>
      </form>
    </Layout>
  );
}
