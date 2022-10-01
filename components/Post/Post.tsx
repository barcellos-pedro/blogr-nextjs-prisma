import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import style from './Post.module.css';
import { PostModel } from '../../utils/post-model';

type PostProps = {
  post: PostModel;
};

export const Post = ({ post }: PostProps) => {
  const {
    id,
    title,
    published,
    content,
    author: { name },
  } = post;

  const postTitle = published ? title : `${title} (Draft)`;
  const authorName = name ? name : 'Unknown author';

  return (
    <section>
      <Link href={`/posts/${id}`}>
        <a className={style.link}>
          <h2>{postTitle}</h2>
          <small>By {authorName}</small>
          <ReactMarkdown children={content} />
        </a>
      </Link>
    </section>
  );
};
