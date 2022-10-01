import React from 'react';
import { GetStaticProps } from 'next';
import { Post } from '../components/Post/Post';
import { POSTS } from '../utils/posts-mock';
import { PostModel } from '../utils/post-model';
import { Layout } from '../components/Layout/Layout';
import Header from '../components/Header/Header';

type BlogProps = {
  feed: PostModel[];
};

export default function Blog({ feed }: BlogProps) {
  return (
    <Layout home>
      <Header />
      <h2>Posts</h2>
      <main className="container">
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
