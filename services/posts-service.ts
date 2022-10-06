import axios from 'axios';
import { PostModel } from '../utils/post-model';

const delay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
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
      return error;
    }
  },
  async createPost(data) {
    try {
      await delay();
      const { data: response } = await api.post('/posts/create', { ...data });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
