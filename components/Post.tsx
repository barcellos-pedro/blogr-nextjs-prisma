import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { PostModel } from '../types/post-model';
import { useSession } from 'next-auth/react';
import { PostMenu } from './PostMenu';

type PostProps = {
  post: PostModel;
};

export const Post = ({ post }: PostProps) => {
  const { data: session } = useSession();
  const {
    id,
    title,
    content,
    author: { name },
  } = post;
  const authorName = name || 'Unknown author';
  const isUserPost = () => session?.user?.email == post.author?.email;

  return (
    <>
      <div className="flex justify-between">
        <Link href={`/posts/${id}`}>
          <a>
            <h2 className="font-bold text-xl">{title}</h2>
          </a>
        </Link>
        {!!isUserPost() && <PostMenu id={id} />}
      </div>
      <small className="text-zinc-500">By {authorName}</small>
      <ReactMarkdown children={content} />
    </>
  );
};
