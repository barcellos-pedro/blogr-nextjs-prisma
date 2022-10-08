import { GetStaticProps } from 'next';
import { PostModel } from '../types/post-model';
import { Layout } from '../components/Layout';
import { PostList } from '../components/PostList';
import Head from 'next/head';
import { postsService } from '../services/posts-service';
import useSWR from 'swr';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Spinner } from '../components/Spinner';

type HomeProps = {
  posts: PostModel[];
  lastFetched: string;
};

export default function Home({ posts, lastFetched }: HomeProps) {
  const {
    data: feed = posts,
    error,
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

  const postsOrMessage = feed?.length ? (
    <PostList items={feed} />
  ) : (
    <p>There are no posts yet</p>
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
        {error && (
          <p className="text-zinc-500">Showing posts from {lastFetched}</p>
        )}

        {postsOrMessage}
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
  const posts = await postsService.getPosts();
  const lastFetched = new Date().toLocaleString();

  return {
    props: { posts, lastFetched },
    revalidate: 300,
  };
};
