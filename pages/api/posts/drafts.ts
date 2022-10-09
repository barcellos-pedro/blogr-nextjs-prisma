import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const session = await getSession({ req: request });

    const drafts = await prisma.post.findMany({
      where: {
        published: false,
        author: { email: session?.user?.email },
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    return response.status(200).json(drafts);
  } catch (error) {
    return response.status(500).send('Error fetching drafts. Try again.');
  }
};
export default handler;
