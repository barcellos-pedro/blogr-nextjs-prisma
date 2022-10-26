import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const getPosts = (username: string) => {
  return prisma.post.findMany({
    where: {
      published: true,
      author: {
        email: {
          contains: username,
        },
      },
    },
    include: {
      author: true,
    },
  });
};

const getAuthor = (username: string) => {
  return prisma.user.findFirstOrThrow({
    where: {
      email: {
        contains: username,
      },
    },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
};

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const username = request.query?.username as string;

    const [posts, author] = await Promise.all([
      getPosts(username),
      getAuthor(username),
    ]);

    return response.status(200).json({ posts, author });
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export default handler;
