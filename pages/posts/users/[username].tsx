import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { Error } from '../../../components/Error';
import { Feed } from '../../../components/Feed';
import { Layout } from '../../../components/Layout';
import { Spinner } from '../../../components/Spinner';
import { postsService } from '../../../services/posts-service';
import { AuthorInfo } from '../../../components/AuthorInfo';
import { UserPostsModel } from '../../../types/user-posts-model';

interface UserPostsPageProps {
  userPosts: UserPostsModel;
  username: string;
  error?: string;
}

export default function UserPostsPage({
  userPosts,
  username,
  error,
}: UserPostsPageProps) {
  const { status } = useSession();
  const { posts, author } = userPosts;

  if (status === 'loading') {
    return <Spinner fullscreen width={40} height={40} />;
  }

  if (error) {
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
        author={author}
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
    const userPosts: UserPostsModel = await postsService.getUserPosts(username);

    return {
      props: { userPosts, username },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        userPosts: null,
        username: null,
        error: error.message,
      },
    };
  }
};
