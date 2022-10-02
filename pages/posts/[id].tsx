import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { PostModel } from '../../utils/post-model';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { Post } from '../../components/Post';
import prisma from '../../lib/prisma';

interface PostProps {
  post: PostModel;
};

export default function PostPage({ post }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{post?.title || 'Post'}</title>
      </Head>
      <Header />
      <article className="bg-white rounded p-8 mb-8">
        <Post post={post} />
      </article>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { post },
  };
};
