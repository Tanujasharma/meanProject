import { Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  //@Output() postCreated = new EventEmitter<Post>();
  loading = false;
  private mode = "create";
  private postId: any;
  post: Post = {} as Post;

  constructor(public postService: PostService,
    public route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("postId")){
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.loading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.loading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      }else {
        this.mode = "create";
        this.postId = null;
      }
    });
    console.log(this.post);
    
  }

  savePost(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.loading = true;
    
    if(this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.updatePost(this.postId,form.value.title, form.value.content);
    }
    form.resetForm();
  }

}
