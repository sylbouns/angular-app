import { NgModule } from '@angular/core';

import { PostSharedModule } from './post.shared';

import { PostOutletComponent } from './post-outlet/post-outlet.component';
import { PostRoutingModule } from './post.routes';
import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostActionsComponent } from './post-actions/post-actions.component';
import { PostVoteComponent } from './post-vote/post-vote.component';

import { PostEditComponent } from './post-edit/post-edit.component';
import { PostAddModule } from './post-add/post-add.module';

@NgModule({
  declarations: [
    PostOutletComponent,
    PostItemComponent,
    PostListComponent,
    PostPageComponent,
    PostActionsComponent,
    PostVoteComponent,
    PostEditComponent,
  ],
  imports: [
    PostSharedModule,
    PostRoutingModule,
    PostAddModule,
  ], 
})
export class PostModule { }
