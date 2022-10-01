import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { PostModel } from '../utils/post-model';

type PostProps = {
  post: PostModel;
};

export const Post = ({ post }: PostProps) => {
  const postTitle = post.published ? post.title : `${post.title} (Draft)`;
  const authorName = post.author.name ? post.author.name : 'Unknown author';

  return (
    <Link href={`/posts/${post.id}`}>
      <a>
        <h2 className="font-bold text-xl">{postTitle}</h2>
        <small className="text-zinc-500">By {authorName}</small>
        <ReactMarkdown children={post.content} />
      </a>
    </Link>
  );
};
