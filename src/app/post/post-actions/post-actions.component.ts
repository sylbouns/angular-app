import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { POST_BASE_PATH } from 'src/app/app.globals';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.css']
})
export class PostActionsComponent implements OnInit {

  @Input() id: Guid;
  public postBasePath: string = '/' + POST_BASE_PATH;

  constructor(private postService: PostService,
              private router: Router) { }
ngOnInit() {
  console.log(this.id);
}
  onPostDelete() {
    this.postService.deletePost(this.id);
    this.router.navigate([this.postBasePath, 'list']);
  }
}
