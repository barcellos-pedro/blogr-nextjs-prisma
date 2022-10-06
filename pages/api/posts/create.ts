import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { title, content } = request.body;
  const session = await getSession({ req: request });

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          email: session?.user?.email,
        },
      },
    },
  });

  return response.status(201).json(newPost);
};

export default handler;
