import { NgModule } from '@angular/core';
import { PostSharedModule } from '../post.shared';
import { PostAddComponent } from './post-add.component';
import { PostAddDialogComponent } from './post-add-dialog/post-add-dialog.component';

@NgModule({
  declarations: [
    PostAddComponent,
    PostAddDialogComponent
  ],
  imports: [
    PostSharedModule,
  ],
  exports: [
    PostAddComponent,
  ],
})
export class PostAddModule { }
