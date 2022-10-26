import { PostModel } from '../types/post-model';
import { PostList } from './PostList';

interface FeedProps {
  error?: string;
  data: PostModel[];
}

export const Feed = ({ error, data }: FeedProps) => {
  if (!error && !data?.length) {
    return <p>There are no data yet</p>;
  }

  if (error && !data?.length) {
    return (
      <>
        <p className="text-zinc-500 mb-3">{error}</p>
        <p>There are no data yet</p>
      </>
    );
  }

  return <PostList data={data} />;
};
