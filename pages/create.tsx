import Head from 'next/head';
import { Layout } from '../components/Layout';
import {
  CloudArrowDownIcon,
  ExclamationCircleIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { Error } from '../components/Error';
import { FormEvent, useState } from 'react';
import { postsService } from '../services/posts-service';
import { showToast } from '../utils/show-toast';
import { useRouter } from 'next/router';
import { getFormData } from '../utils/form-data';
import { CreationStatus } from '../types/creation-status';
import { ToggleButton } from '../components/ToggleButton';
import { Spinner } from '../components/Spinner';

export default function CreatePage() {
  const { NOT_STARTED, CREATING, SUCCESS, ERROR } = CreationStatus;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [publish, setPublish] = useState(false);

  const [creationStatus, setCreationStatus] =
    useState<CreationStatus>(NOT_STARTED);

  const navigate = (queryValue: string) =>
    router.push({
      pathname: '/posts/[id]',
      query: { id: queryValue },
    });

  const createEvent = async (event: FormEvent) => {
    setCreationStatus(CREATING);
    event.preventDefault();

    try {
      const data = getFormData(event);
      const newPost = await postsService.createPost(data);
      setCreationStatus(SUCCESS);
      showToast('Post created!', 'success');
      navigate(newPost.id);
    } catch (error) {
      setCreationStatus(ERROR);
      showToast(error.message, 'error');
    } finally {
      setTimeout(() => {
        setCreationStatus(NOT_STARTED);
      }, 3000);
    }
  };

  if (status === 'loading') {
    return <Spinner fullscreen width={40} height={40} />;
  }

  if (!session) {
    return (
      <Error
        title="Access denied"
        description="You need to be logged in to view this page"
        buttonText="Login"
        navigateTo="/login"
      />
    );
  }

  return (
    <Layout>
      <Head>
        <title>Blog - Create</title>
      </Head>

      <h1 className="text-2xl font-bold">New Post</h1>

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

        <div className="flex items-center gap-2 justify-end">
          <ToggleButton
            id="publish"
            label="Publish ?"
            checked={publish}
            onChange={() => setPublish(!publish)}
          />
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
