import React from 'react';
import { GetStaticProps } from 'next';
import { POSTS } from '../utils/posts-mock';
import { PostModel } from '../utils/post-model';
import { Layout } from '../components/Layout';
import { Header } from '../components/Header';

import { PostList } from '../components/PostList';
import prisma from '../lib/prisma';
import Head from 'next/head';

type HomeProps = {
  feed: PostModel[];
};

export default function Home({ feed }: HomeProps) {
  return (
    <Layout home>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <h2 className="text-black font-bold text-2xl mb-7">Public Feed</h2>
      <div className="bg-white rounded p-8">
        {!feed.length ? (
          <p>There are no posts yet</p>
        ) : (
          <PostList items={feed} />
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    props: { feed },
    revalidate: 10000,
  };
};
