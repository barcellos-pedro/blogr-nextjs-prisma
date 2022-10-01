import { PostModel } from '../utils/post-model';
import { Post } from './Post';

interface PostListProps {
  items: PostModel[];
}

export const PostList = ({ items }: PostListProps) => {
  return (
    <>
      {items.map((item) => (
        <section key={item.id} className="mt-8">
          <Post post={item} />
        </section>
      ))}
    </>
  );
};
