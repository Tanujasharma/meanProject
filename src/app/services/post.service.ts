import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts: Post[] = [];
  public PostUpdated = new Subject<Post[]>();

  constructor() { }

  getPosts() {
    return [...this.posts]
  }

  getPostUpdates() {
    return this.PostUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.PostUpdated.next([...this.posts]);
  }
}
