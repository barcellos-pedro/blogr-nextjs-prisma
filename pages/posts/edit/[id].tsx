import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Error } from '../../../components/Error';
import { Form } from '../../../components/form';
import { Layout } from '../../../components/Layout';
import { Spinner } from '../../../components/Spinner';
import { postsService } from '../../../services/posts-service';
import { PostModel } from '../../../types/post-model';
import { getFormData } from '../../../utils/form-data';
import { showToast } from '../../../utils/show-toast';

interface EditPageProps {
  post: PostModel;
  error?: string;
}

export default function EditPage({ post, error }: EditPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isUserOwnPost = () => session?.user?.email == post?.author?.email;

  // Form field
  const [isPublished, setIsPublished] = useState(post.published);

  const updatePost = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const data = getFormData(event);
      const newPost = await postsService.updatePost(post.id, data);
      showToast('Post updated!', 'success');
      newPost.published ? router.push('/') : router.push('/drafts');
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const deletePost = async () => {
    try {
      await postsService.deletePost(post.id);
      showToast('Post deleted 🗑️', 'success');
      router.push('/');
    } catch (error) {
      showToast(error.message, 'error');
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

  if (error || !post.id) {
    return (
      <Error
        title="Post not found"
        description={error}
        buttonText="Feed"
        navigateTo="/"
      />
    );
  }

  if (!post?.published && !isUserOwnPost()) {
    return (
      <Error
        title="Access denied"
        description="You cannot accces this page"
        buttonText="Login"
        navigateTo="/login"
      />
    );
  }

  return (
    <Layout>
      <Head>
        <title>Stories - Edit</title>
      </Head>

      <h1 className="text-2xl font-bold">Edit Post - {post.title}</h1>

      <Form
        onSubmit={updatePost}
        isPublished={isPublished}
        onPublishedChange={() => setIsPublished(!isPublished)}
        onDelete={deletePost}
        data={{ ...post }}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const post = await postsService.getPost(String(params?.id));
    return {
      props: { post },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { post: null, error: error.message },
    };
  }
};
