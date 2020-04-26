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

  public getPosts() {
    return this.posts;
  }

  private getEmptyPost() {
    const post: Post = new Post();
    // Default data except ID generated on save
    post.createdAt = new Date();
    post.updatedAt = new Date();
    post.loveIts = 0;
    return post;
  }

  private getPostIndex(id: Guid) {
    return this.posts.getValue().findIndex((post: Post) => post.id.equals(id));
  }

  public getPost(id: Guid): Observable<Post> {
    return this.getPosts().pipe(
      map(posts => posts.find((post: Post) => post.id.equals(id)))
    );
  }

  public isNewPost(post:Post) {
    return post.id == undefined;
  }

  public savePost(post: Post) {
    this.isNewPost(post) ? this.addPost(post) : this.updatePost(post);
  }

  public deletePost(id: Guid) {
    console.log('Delete post', id);
    this.posts.getValue().splice(this.getPostIndex(id), 1);
    this.emmitPosts();
  }

  private addPost(post: Post) {
    console.log('Add post', post);
    let newPost = this.getEmptyPost();
    newPost.id = Guid.create();
    this.posts.getValue().push({ ...newPost, ...post })
    this.emmitPosts();
  }

  private updatePost(post: Post) {
    console.log('Update post', post);
    post.updatedAt = new Date();
    this.posts.getValue().splice(this.getPostIndex(post.id), 1, post);
    this.emmitPosts();
  }

  private emmitPosts() {
    this.posts.next(this.posts.getValue());
  }
}
