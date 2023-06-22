import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts: Post[] = [];
  public PostUpdated = new Subject<Post[]>();

  constructor( public http : HttpClient,
     private router: Router,
    ) { }

  //getting all the posts
  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((res) => {
      return res.posts.map((post: { title: any; content: any; _id: any; }) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.PostUpdated.next([...this.posts]);
    });
  }

  getPostUpdates() {
    return this.PostUpdated.asObservable();
  }

  //single post
  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  }

  addPost(title: string, content: string) {
    const post: Post = {id: '', title: title, content: content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((res) => {
      console.log(res.message);
      const id = res.postId;
      post.id = id;
      this.posts.push(post);
      this.PostUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }

  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe((res) => {
    const updatedPost = [...this.posts];
    const oldPostIndex = updatedPost.findIndex(p => p.id === post.id);
    updatedPost[oldPostIndex] =post;
    this.posts = updatedPost;
    this.PostUpdated.next([...this.posts]);
    this.router.navigate(["/"]);
    })

  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);  
      this.posts = updatedPosts;
      this.PostUpdated.next([...this.posts]);  
    });
  }
}
