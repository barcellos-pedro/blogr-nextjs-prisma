import React from 'react';
import { GetServerSideProps } from 'next';
import { POSTS } from '../../utils/posts-mock';
import { PostModel } from '../../utils/post-model';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { Post } from '../../components/Post';
import Head from 'next/head';

type PostProps = {
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
  const post = POSTS.find((post) => post.id === params.id);

  return {
    props: { post },
  };
};
