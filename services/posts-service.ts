import axios from 'axios';
import { delay } from '../utils/delay';
import { PostModel } from '../types/post-model';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/posts',
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
      const { data: response } = await api.post<PostModel>('/created', {
        ...data,
      });
      return response;
    } catch (error) {
      handleError(error.response?.data);
    }
  },
};
