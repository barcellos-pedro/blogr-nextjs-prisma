import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { PostModel } from '../../utils/post-model';
import { Layout } from '../../components/Layout';
import { Post } from '../../components/Post';
import { postsService } from '../../services/posts-service';

interface PostProps {
  post: PostModel;
}

export default function PostPage({ post }: PostProps) {
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
  const post = await postsService.getPost(String(params?.id));

  return {
    props: { post },
  };
};
