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
    author: { name, email },
  } = post;

  const username = email.substring(0, email.indexOf('@'));
  const isUserPost = () => session?.user?.email == email;

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
      <Link href={`/posts/users/${username}`}>
        <a className="text-sm font-semibold text-zinc-500 hover:underline">
          {name || 'Unknown author'}
        </a>
      </Link>
      <ReactMarkdown children={content} />
    </>
  );
};
