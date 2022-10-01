import { PostModel } from '../utils/post-model';
import { Post } from './Post';

interface PostListProps {
  items: PostModel[];
}

export const PostList = ({ items }: PostListProps) => {
  return (
    <>
      {items.map((item) => (
        <section className="mt-8">
          <Post key={item.id} post={item} />
        </section>
      ))}
    </>
  );
};
