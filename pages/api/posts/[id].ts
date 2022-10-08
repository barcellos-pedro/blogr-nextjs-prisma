import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: String(request.query?.id),
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    return response.status(200).json(post);
  } catch (error) {
    return response.status(500).send('Error fething a post. Try again');
  }
};

export default handler;
