import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const username = request.query?.username as string;
    const posts = await prisma.post.findMany({
      where: {
        published: true,
        author: {
          email: {
            contains: username,
          },
        },
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
            image: true,
            _count: {
              select: {
                posts: true,
              },
            },
          },
        },
      },
    });

    return response.status(200).json(posts);
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export default handler;
