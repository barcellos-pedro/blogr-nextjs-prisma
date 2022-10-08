import axios from 'axios';
import { delay } from '../utils/delay';
import { PostModel } from '../types/post-model';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const postsService = {
  async getPosts() {
    try {
      const { data } = await api.get<PostModel[]>('/posts');
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async getPost(id: string) {
    try {
      const { data } = await api.get<PostModel>(`/posts/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async createPost(data) {
    try {
      await delay();
      const { data: response } = await api.post<PostModel>('/posts/create', {
        ...data,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
