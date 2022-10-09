import { NextApiRequest, NextApiResponse } from 'next';
import { postsController } from '../../../controllers/posts';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const data = await postsController(request);
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export default handler;
