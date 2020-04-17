import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { POST_BASE_PATH } from 'src/app/app.globals';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  public post: Post = new Post();
  public isNewPost: Boolean = true;
  public postForm: FormGroup;
  public postBasePath: string = '/' + POST_BASE_PATH;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { post: Post }) => {
      if (data.post) {
        this.post = data.post;
        this.isNewPost = false;  
      }
    });

    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: [this.post.title, Validators.required],
      content: [this.post.content, Validators.required],
    });
  }

  onSubmitForm() {
    this.post.title = this.postForm.value['title'];
    this.post.content = this.postForm.value['content'];

    if (this.isNewPost) {
      this.postService.addPost(this.post);
    } else {
      this.postService.updatePost(this.post);
    }

    this.router.navigate(['/post']);
  }
}
