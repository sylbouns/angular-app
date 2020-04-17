import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Post } from './post.model';
import { posts } from './post.mock';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  private posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>(posts);

  constructor() { }

  getNewPost() {
    return new Post();
  }

  getPosts() {
    return this.posts;
  }

  addPost(post: Post) {
    console.log('add post !')
    // post.id = Guid.create();
    // post.createdAt = new Date();
    // post.updatedAt = new Date();
    // this.posts.push(post);
  }

  getPost(id: string): Observable<Post> {
    return this.getPosts().pipe(
      map(posts => posts.find((post: Post) => post.id.equals(Guid.parse(id))))
    );
  }

  updatePost(post: Post) {
    console.log('update post !');
    // post.updatedAt = new Date();
    // const index = this.posts.findIndex((p: Post) => p.id.equals(post.id));
    // this.posts.splice(index, 1, post);
  }

  deletePost(id: string) {
    console.log('delete post !');
    // const index = this.posts.findIndex((post: Post) => post.id.equals(id));
    // this.posts.splice(index, 1);
  }
}
