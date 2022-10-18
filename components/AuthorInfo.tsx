import { BookOpenIcon, InboxIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { HTMLAttributes } from 'react';

interface AuthorInfoProps extends HTMLAttributes<HTMLDivElement> {
  username: string;
  author: {
    name: string;
    email: string;
    image: string;
    count: number;
  };
}

export const AuthorInfo = ({
  username,
  author,
  ...sectionAttrs
}: AuthorInfoProps) => {
  const storiesCount = author.count > 1 ? 'stories' : 'story';

  return (
    <section {...sectionAttrs}>
      <Image
        width={50}
        height={50}
        src={author.image}
        className="rounded-full"
        priority={true}
      />
      <h1 className="text-xl font-bold mt-1">
        {author.name} ({username})
      </h1>
      <h3
        className="flex gap-1 items-center text-zinc-500"
        title={author.email}
      >
        <InboxIcon width={20} height={20} /> {author.email}
      </h3>
      <p className="flex gap-1 items-center text-zinc-500">
        <BookOpenIcon width={20} height={20} /> {author.count} {storiesCount}
      </p>
    </section>
  );
};
