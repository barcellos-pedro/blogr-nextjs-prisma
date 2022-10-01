import React from 'react';
import { GetStaticProps } from 'next';
import { POSTS } from '../utils/posts-mock';
import { PostModel } from '../utils/post-model';
import { Layout } from '../components/Layout';
import Header from '../components/Header';
import { Post } from '../components/Post';

type BlogProps = {
  feed: PostModel[];
};

export default function Blog({ feed }: BlogProps) {
  return (
    <Layout home >
      <Header />
      <h2 className="text-black font-bold text-2xl mb-7">Public Feed</h2>
      <main className="bg-white rounded p-8">
        {feed.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = POSTS;

  return {
    props: { feed },
    revalidate: 10,
  };
};
