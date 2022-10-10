import axios from 'axios';
import { delay } from '../utils/delay';
import { PostModel } from '../types/post-model';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://barcellos-pedro-blogr-nextjs-prisma.vercel.app/api/posts'
    : 'http://localhost:3000/api/posts';

const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const handleError = (message: string = 'Something went wrong. Try again') => {
  throw new Error(message);
};

export const postsService = {
  async getPosts() {
    try {
      const { data } = await api.get<PostModel[]>('/');
      return data;
    } catch (error) {
      handleError(error.response?.data);
    }
  },
  async getPost(id: string) {
    try {
      const { data } = await api.get<PostModel>(`/${id}`);
      return data;
    } catch (error) {
      handleError(error.response?.data);
    }
  },
  async createPost(data) {
    try {
      await delay();
      const { data: response } = await api.post<PostModel>('/create', {
        ...data,
      });
      return response;
    } catch (error) {
      handleError(error.response?.data);
    }
  },
  async getDrafts() {
    try {
      const { data } = await api.get<PostModel[]>('/drafts');
      return data;
    } catch (error) {
      handleError(error.response?.data);
    }
  },
  async deletePost(id: string) {
    try {
      const { data } = await api.delete<PostModel>(`/${id}`);
      return data;
    } catch (error) {
      handleError(error.response?.data);
    }
  },
  async updatePost(id: string, data) {
    try {
      const { data: response } = await api.patch<PostModel>(`/${id}`, {
        ...data,
      });

      return response;
    } catch (error) {
      handleError(error.response?.data);
    }
  },
};
