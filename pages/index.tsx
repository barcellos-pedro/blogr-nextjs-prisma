import { GetStaticProps } from 'next';
import { PostModel } from '../types/post-model';
import { Layout } from '../components/Layout';
import Head from 'next/head';
import { postsService } from '../services/posts-service';
import useSWR from 'swr';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Spinner } from '../components/Spinner';
import { Feed } from '../components/Feed';

type HomeProps = {
  posts: PostModel[];
  buildFetchError?: string;
};

export default function Home({ posts, buildFetchError }: HomeProps) {
  const {
    data: feed = posts,
    error: swrError,
    mutate,
    isValidating,
  } = useSWR('/posts', postsService.getPosts);

  const updatePosts = async () => {
    // update feed data with swr function
    await mutate();
  };

  const refreshIcon = isValidating ? (
    <Spinner width={20} height={20} />
  ) : (
    <ArrowPathIcon width={20} height={20} />
  );

  return (
    <Layout home>
      <Head>
        <title>Home</title>
      </Head>

      <div className="flex justify-between items-center">
        <h2 className="text-black font-bold text-2xl mb-7">Public Feed</h2>
        <button
          onClick={updatePosts}
          className="flex gap-2 bg-white p-2 rounded border border-transparent hover:border-blue-400 duration-300"
        >
          {refreshIcon}
        </button>
      </div>

      <div className="bg-white rounded p-8">
        <Feed error={buildFetchError} data={feed} />
      </div>

      <Link href="https://github.com/barcellos-pedro">
        <a target="_blank" className="flex justify-center my-5">
          Made with ❤️ by Pedro Reis
        </a>
      </Link>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const posts = await postsService.getPosts();
    return {
      props: { posts },
      revalidate: 300,
    };
  } catch (error) {
    console.error(error);
    return {
      props: { posts: [], buildFetchError: error.message },
      revalidate: 300,
    };
  }
};
