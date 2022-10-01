import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import { POSTS } from '../../utils/posts-mock';
import { PostModel } from '../../utils/post-model';
import Header from '../../components/Header/Header';
import { Layout } from '../../components/Layout/Layout';
import style from './Posts.module.css';

type PostProps = {
  post: PostModel;
};

export default function Post({ post }: PostProps) {
  const postTitle = post.published ? post.title : `${post.title} (Draft)`;
  const authorName = post.author.name ? post.author.name : 'Unknown author';

  return (
    <Layout className={style.page}>
      <Header title="Post" />
      <article>
        <h2>{postTitle}</h2>
        <p>By {authorName}</p>
        <ReactMarkdown children={post.content} />
      </article>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = POSTS.find((it) => it.id === params.id);

  return {
    props: { post },
  };
};
