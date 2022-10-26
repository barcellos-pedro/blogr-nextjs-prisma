import { Author } from './author';
import { PostModel } from './post-model';

export interface UserPostsModel {
  posts: PostModel[];
  author: Author;
}
