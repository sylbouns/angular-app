import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  @Input() post: Post = new Post();
  public isNewPost: boolean = true;
  public postForm: FormGroup;

  @Output() onSubmit = new EventEmitter<string>();

  @ViewChild("form") form:NgForm;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService) { }

  ngOnInit() {
    this.isNewPost = this.postService.isNewPost(this.post);
    this.postForm = this.formBuilder.group({
      title: [this.post.title, Validators.required],
      content: [this.post.content, Validators.required],
    });
  }

  onSubmitForm() {
    this.post.title = this.postForm.value['title'];
    this.post.content = this.postForm.value['content'];
    this.postService.savePost(this.post);
    this.onSubmit.next('submit');
  }

  public submit() {
    this.form.ngSubmit.emit();
  }
}
