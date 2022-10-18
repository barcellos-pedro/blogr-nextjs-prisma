import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { Error } from '../../../components/Error';
import { Feed } from '../../../components/Feed';
import { Layout } from '../../../components/Layout';
import { Spinner } from '../../../components/Spinner';
import { postsService } from '../../../services/posts-service';
import { UserPostsModel } from '../../../types/user-posts-model';
import { AuthorInfo } from '../../../components/AuthorInfo';

interface UserPostsPageProps {
  posts: UserPostsModel[];
  username: string;
  error?: string;
}

export default function UserPostsPage({
  posts,
  username,
  error,
}: UserPostsPageProps) {
  const { status } = useSession();
  const { author } = posts[0];
  const count = posts[0].author._count.posts;

  if (status === 'loading') {
    return <Spinner fullscreen width={40} height={40} />;
  }

  if (error || !posts?.length) {
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
        <title>
          {author.name} (@{username}) / Stories
        </title>
      </Head>

      <AuthorInfo
        className="flex flex-col items-start bg-white rounded p-8 pb-0 overflow-hidden"
        username={username}
        author={{ ...author, count }}
      />

      <section className="bg-white rounded p-8 mb-8">
        <Feed data={posts} />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const username = params?.username as string;
    const posts = await postsService.getUserPosts(username);

    return {
      props: { posts, username },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { posts: null, username: null, error: error.message },
    };
  }
};
