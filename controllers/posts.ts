import { NextApiRequest } from 'next';

export const postsController = async (request: NextApiRequest) => {
  try {
    switch (request.method) {
      case 'GET':
        return await getById(request);
      case 'PUT':
        return await updateById(request);
      case 'DELETE':
        return await deleteById(request);
      default:
        throw new Error('Method not allowed');
    }
  } catch (error) {
    throw error;
  }
};

// Methods/actions
export const getById = async (request: NextApiRequest) => {
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

    return post;
  } catch (error) {
    throw new Error('Error fething a post. Try again');
  }
};

export const updateById = async (request: NextApiRequest) => {
  try {
    // TODO: Implement
  } catch (error) {
    throw new Error('Error updatind a post. Try again');
  }
};

export const deleteById = async (request: NextApiRequest) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: request.query?.id as string },
    });
    return deletedPost;
  } catch (error) {
    throw new Error('Error deleteing a post. Try again');
  }
};
