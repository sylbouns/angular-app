import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators'
import { Post } from './post.model';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<Post> {

  constructor(private postService: PostService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot): Observable<Post> | Observable<never> {
    
    let id = route.paramMap.get('id');

    return this.postService.getPost(id).pipe(
      take(1),
      mergeMap(post => {
        if (post) {
          return of(post);
        } else {
          this.router.navigate(['/not-found']);
          return EMPTY;
        }
      })
    );
  }
}