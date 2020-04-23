import { Component, OnInit, Input } from '@angular/core';
import { POST_BASE_PATH } from 'src/app/app.globals';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-post-vote',
  templateUrl: './post-vote.component.html',
  styleUrls: ['./post-vote.component.scss']
})
export class PostVoteComponent implements OnInit {

  @Input() id: Guid;
  public post: Post;
  public postBasePath: string = '/' + POST_BASE_PATH;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPost(this.id).subscribe(( post: Post ) => this.post = post );
  }

  loveItsUp() {
    this.post.loveIts++;
  }

  loveItsDown() {
    this.post.loveIts--;
  }
}
