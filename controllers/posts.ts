import { NextApiRequest } from 'next';
import prisma from '../lib/prisma';

export const postsController = async (request: NextApiRequest) => {
  try {
    switch (request.method) {
      case 'GET':
        return await getById(request);
      case 'PATCH':
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
    const { title, content, publish } = request.body;

    if (!title) {
      throw new Error('The post needs a title');
    }

    const published = publish === 'on';

    const updatedPost = await prisma.post.update({
      where: { id: request.query.id as string },
      data: {
        title,
        content,
        published,
      },
    });

    return updatedPost;
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
