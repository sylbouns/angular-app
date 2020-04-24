import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { POST_BASE_PATH } from 'src/app/app.globals';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.css']
})
export class PostActionsComponent {

  @Input() id: Guid;
  public postBasePath: string = '/' + POST_BASE_PATH;

  constructor(private postService: PostService,
              private router: Router) { }

  onPostDelete() {
    this.postService.deletePost(this.id);
    this.router.navigate([this.postBasePath, 'list']);
  }
}
