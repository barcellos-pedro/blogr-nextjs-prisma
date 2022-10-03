import axios from 'axios';
import { PostModel } from '../utils/post-model';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const postsService = {
  async getPosts() {
    try {
      const { data } = await api.get<PostModel[]>('/posts');
      return data;
    } catch (error) {
      throw error;
    }
  },
};
