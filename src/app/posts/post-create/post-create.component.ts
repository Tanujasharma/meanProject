import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import {
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  //@Output() postCreated = new EventEmitter<Post>();
  loading = false;
  private mode = 'create';
  private postId: any;
  post: Post = {} as Post;
  validateForm!: FormGroup; //Reactive Forms
  imagePreview: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.loading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.loading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
          this.validateForm.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
    console.log(this.post);
  }

  onImageselected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.validateForm.patchValue({ image: file });
    this.validateForm.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    
  }

  savePost() {
    if (this.validateForm.invalid) {
      return;
    }
    this.loading = true;

    if (this.mode === 'create') {
      this.postService.addPost(this.validateForm.value.title, this.validateForm.value.content);
    } else {
      this.postService.updatePost(
        this.postId,
        this.validateForm.value.title,
        this.validateForm.value.content
      );
    }
    this.validateForm.reset();
  }
}
