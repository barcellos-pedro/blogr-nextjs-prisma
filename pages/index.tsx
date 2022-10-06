import { GetStaticProps } from 'next';
import { PostModel } from '../utils/post-model';
import { Layout } from '../components/Layout';
import { PostList } from '../components/PostList';
import Head from 'next/head';
import { postsService } from '../services/posts-service';
import useSWR from 'swr';
import { ArrowPathIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type HomeProps = {
  posts: PostModel[];
};

export default function Home({ posts }: HomeProps) {
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
          {isValidating ? (
            <CloudArrowDownIcon
              className="animate-pulse"
              width={20}
              height={20}
            />
          ) : (
            <>
              Refresh
              <ArrowPathIcon width={20} height={20} />
            </>
          )}
        </button>
      </div>

      <div className="bg-white rounded p-8">
        {error && (
          <p className="text-center text-xl">
            Error when fetching latest posts. Try again.
          </p>
        )}

        {!feed?.length ? (
          <p>There are no posts yet</p>
        ) : (
          <PostList items={feed} />
        )}
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

  return {
    props: { posts },
    revalidate: 300,
  };
};
