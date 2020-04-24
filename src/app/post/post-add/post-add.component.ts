import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../post.model';
import { PostAddDialogComponent } from './post-add-dialog/post-add-dialog.component';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  
  private post: Post = new Post(); 

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(PostAddDialogComponent, {
      data: {post: this.post}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.post = result;
      console.log(this.post);
    });
  }

  ngOnInit(): void {
  }

}