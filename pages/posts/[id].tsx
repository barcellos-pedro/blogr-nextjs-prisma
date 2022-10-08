import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { PostModel } from '../../types/post-model';
import { Layout } from '../../components/Layout';
import { Post } from '../../components/Post';
import { postsService } from '../../services/posts-service';
import { Error } from '../../components/Error';
import { useSession } from 'next-auth/react';
import { Spinner } from '../../components/Spinner';

interface PostProps {
  post: PostModel;
  error?: string;
}

export default function PostPage({ post, error }: PostProps) {
  const { data: session, status } = useSession();
  const isUserOwnPost = () => session?.user?.email == post?.author?.email;
  const isPublished = () => post?.published;

  if (status === 'loading') {
    return (
      <main className="flex justify-center items-center h-screen">
        <Spinner height={50} width={50} />
      </main>
    );
  }

  if (error || !post) {
    return (
      <Error
        title="Post not found"
        description={error}
        buttonText="Feed"
        navigateTo="/"
      />
    );
  }

  if (!isPublished() && !isUserOwnPost()) {
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
        <title>Story {post?.title}</title>
      </Head>

      <article className="bg-white rounded p-8 mb-8">
        <Post post={post} />
      </article>
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
