import { PostModel } from './post-model';

export const POSTS: PostModel[] = [
  {
    id: '1',
    title: 'Prisma is the perfect ORM for Next.js',
    content:
      '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
    published: false,
    author: {
      name: 'Nikolas Burk',
      email: 'burk@prisma.io',
    },
  },
];
