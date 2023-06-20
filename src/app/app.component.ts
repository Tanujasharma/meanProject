import { Component, Input } from '@angular/core';

import {Post} from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meanProject';
  storedPosts: Post[] = [];
  
  // onPostAdded(post: any) {
  //   this.storedPosts.push(post);
  // }
}
