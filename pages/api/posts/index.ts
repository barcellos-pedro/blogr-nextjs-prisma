import prisma from '../../../lib/prisma';

const handler = async (request, response) => {
  try {
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
  } catch (error) {
    return response.status(500).send('Error fething posts. Try again');
  }
};

export default handler;
