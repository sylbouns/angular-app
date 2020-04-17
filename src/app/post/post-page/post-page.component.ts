import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POST_BASE_PATH } from 'src/app/app.globals';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  public post: Post;
  public postBasePath: string = '/' + POST_BASE_PATH;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { post: Post }) => this.post = data.post );
  }

  loveItsUp() {
    this.post.loveIts++;
  }

  loveItsDown() {
    this.post.loveIts--;
  }
}
