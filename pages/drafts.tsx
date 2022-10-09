import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Error } from '../components/Error';
import { Feed } from '../components/Feed';
import { Layout } from '../components/Layout';
import { Spinner } from '../components/Spinner';
import { postsService } from '../services/posts-service';
import { PostModel } from '../types/post-model';

interface DraftsProps {
  drafts: PostModel[];
  error?: string;
}

export default function Drafts({ drafts, error }: DraftsProps) {
  const { data: session, status } = useSession();

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

  if (error) {
    return (
      <Error
        title="Error loading drafts"
        description={error}
        buttonText="Home"
        navigateTo="/"
      />
    );
  }

  return (
    <Layout>
      <Head>
        <title>Stories - Drafts</title>
      </Head>

      <h1 className="text-2xl font-bold mb-5">Drafts</h1>

      <section className="mb-10 bg-white rounded p-8">
        <Feed data={drafts} />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const drafts = await postsService.getDrafts();
    return {
      props: { drafts },
    };
  } catch (error) {
    return {
      props: { drafts: [], error: error.message },
    };
  }
};
