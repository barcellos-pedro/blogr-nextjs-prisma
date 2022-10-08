import prisma from '../../../lib/prisma';

const handler = async (request, response) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return response.status(200).json(posts);
};

export default handler;
