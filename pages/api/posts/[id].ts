import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: String(request.query?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return response.status(200).json(post);
};

export default handler;
