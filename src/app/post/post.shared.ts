import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { PostFormComponent } from './post-form/post-form.component';
import { PostService } from './post.service';

@NgModule({
  declarations: [
    PostFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    PostService,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PostFormComponent,
  ]
})
export class PostSharedModule { }
