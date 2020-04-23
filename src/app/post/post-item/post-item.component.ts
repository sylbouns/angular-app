import { Component, OnInit, Input } from '@angular/core';
import { POST_BASE_PATH } from 'src/app/app.globals';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  @Input() id: Guid;
  public post: Post;
  public postBasePath: string = '/' + POST_BASE_PATH;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPost(this.id).subscribe(( post: Post ) => this.post = post );
  }
}
