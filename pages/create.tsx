import Head from 'next/head';
import { Layout } from '../components/Layout';
import { useSession } from 'next-auth/react';
import { Error } from '../components/Error';
import { FormEvent, useState } from 'react';
import { postsService } from '../services/posts-service';
import { showToast } from '../utils/show-toast';
import { useRouter } from 'next/router';
import { getFormData } from '../utils/form-data';
import { CreationStatus } from '../types/creation-status';
import { Spinner } from '../components/Spinner';
import { Form } from '../components/form';

export default function CreatePage() {
  const { NOT_STARTED, CREATING, SUCCESS, ERROR } = CreationStatus;
  const { data: session, status } = useSession();
  const router = useRouter();

  // Form fields and
  const [isPublished, setIsPublished] = useState(false);

  // Status for visual feedback (icons)
  const [creationStatus, setCreationStatus] = useState(NOT_STARTED);

  const createEvent = async (event: FormEvent) => {
    setCreationStatus(CREATING);
    event.preventDefault();

    try {
      const data = getFormData(event);
      const newPost = await postsService.createPost(data);
      setCreationStatus(SUCCESS);
      showToast('Post created!', 'success');
      newPost.published ? router.push('/') : router.push('/drafts');
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
        <title>Stories - Create</title>
      </Head>

      <h1 className="text-2xl font-bold">New Post</h1>

      <Form
        onSubmit={createEvent}
        isPublished={isPublished}
        onPublishedChange={() => setIsPublished(!isPublished)}
        submittingStatus={creationStatus}
      />
    </Layout>
  );
}
