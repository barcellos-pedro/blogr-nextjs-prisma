export interface UserPostsModel {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: {
    name: string;
    email: string;
    image: string;
    _count: {
      posts: number;
    };
  };
}
