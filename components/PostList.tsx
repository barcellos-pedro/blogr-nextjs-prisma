import { PostModel } from '../types/post-model';
import { Post } from './Post';

interface PostListProps {
  data: PostModel[];
}

export const PostList = ({ data }: PostListProps) => {
  return (
    <div className="flex flex-col gap-6">
      {data.map((item) => (
        <section key={item.id}>
          <Post post={item} />
        </section>
      ))}
    </div>
  );
};
