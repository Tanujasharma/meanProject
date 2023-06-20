import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title:'First Post', content:'This is the first post content'},
  //   { title:'Second Post', content:'This is the second post content'},
  //   { title:'Third Post', content:'This is the third post content'}
  // ];
  //@Input() posts: Post[] = [];

  posts: Post[] = [];
  private postSubs!: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
    this.postSubs = this.postService
      .getPostUpdates()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    this.postSubs.unsubscribe();
  }
}
