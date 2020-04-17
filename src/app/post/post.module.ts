import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from 'src/theme/theme.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AbsPipe } from 'src/app/shared/pipes/abs.pipe';

import { PostOutletComponent } from './post-outlet/post-outlet.component';
import { PostRoutingModule } from './post.routes';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostActionsComponent } from './post-actions/post-actions.component';

import { PostService } from './post.service';

@NgModule({
  declarations: [
    PostOutletComponent,
    PostItemComponent,
    PostListComponent,
    PostFormComponent,
    PostPageComponent,
    PostActionsComponent,
    AbsPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    ThemeModule,
    SharedModule,
  ],
  providers: [
    PostService,
  ],
})
export class PostModule { }
