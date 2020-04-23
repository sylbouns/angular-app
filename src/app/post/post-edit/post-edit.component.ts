import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { POST_BASE_PATH } from '@app/app.globals';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  public post: Post = new Post();
  public isNewPost: Boolean = true;
  public postBasePath: string = '/' + POST_BASE_PATH;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { post: Post }) => {
      if (data.post) {
        this.post = data.post;
        this.isNewPost = false;  
      }
    });
  }

  onSubmit(event) {
    if (event == "submit") this.router.navigate([this.postBasePath]);
  }
}
