export interface Author {
  name: string;
  email: string;
  image: string;
  _count: {
    posts: number;
  };
}
