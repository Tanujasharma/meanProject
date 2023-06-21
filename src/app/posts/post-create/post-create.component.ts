import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  //@Output() postCreated = new EventEmitter<Post>();

  constructor(public postService: PostService) {

  }

  ngOnInit(): void {
  }

  savePost(form: NgForm) {
    if(form.invalid){
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content,
      id: ''
    };
    //this.postCreated.emit(post);
    this.postService.addPost(post.title, post.content);
    form.resetForm();
  }

}
