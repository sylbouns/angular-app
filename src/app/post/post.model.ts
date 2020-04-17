import { Guid } from 'guid-typescript';

export class Post {
    public id: Guid;
    public title: string;
    public content: string;
    public createdAt: Date;
    public updatedAt?: Date;
    public loveIts: number;
}
