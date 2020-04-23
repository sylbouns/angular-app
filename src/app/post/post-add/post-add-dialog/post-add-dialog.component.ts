import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostAddDialogData } from '../post-add-dialog-data';

@Component({
  selector: 'app-post-add-dialog',
  templateUrl: './post-add-dialog.component.html',
  styleUrls: ['./post-add-dialog.component.scss']
})
export class PostAddDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PostAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostAddDialogData) {}

  onSubmit(): void {
    this.dialogRef.close();
  }

}
