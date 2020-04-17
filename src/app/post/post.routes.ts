import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { PostGuard } from './post.guard';
import { PostResolver } from './post.resolver';

import { PostListComponent } from './post-list/post-list.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostOutletComponent } from './post-outlet/post-outlet.component';

const routes: Routes = [
  { path: '',
    component: PostOutletComponent, 
    canActivateChild: [PostGuard], 
    children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: PostListComponent },
        { path: 'new', component: PostFormComponent },
        { path: ':id', redirectTo: ':id/view' },
        { path: ':id/view', component: PostPageComponent, resolve: { post: PostResolver } },
        { path: ':id/edit', component: PostFormComponent, resolve: { post: PostResolver } },
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class PostRoutingModule {}
