import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { PostModel } from '../../types/post-model';
import { Layout } from '../../components/Layout';
import { Post } from '../../components/Post';
import { postsService } from '../../services/posts-service';
import { Error } from '../../components/Error';

interface PostProps {
  post: PostModel;
  error?: string;
}

export default function PostPage({ post, error }: PostProps) {
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

  return (
    <Layout>
      <Head>
        <title>{post?.title || 'Post'}</title>
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
