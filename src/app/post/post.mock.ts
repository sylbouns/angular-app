import { Post } from './post.model';
import { Guid } from "guid-typescript";

export const posts: Post[] = [
    {
        id: Guid.parse('aa1f5a81-2b47-c784-e43f-01c06f09f996'),
        title: 'Mon premier post',
        content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis',
        createdAt: new Date('2019-05-22T07:22:13'),
        loveIts: 0,
    },
    {
        id: Guid.parse('25666638-c0c3-1813-47b2-db218cd0befc'),
        title: 'Mon deuxieme post',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
        createdAt: new Date('2019-04-18T17:52:31'),
        loveIts: 1,
    },
    {
        id: Guid.parse('4b07b8eb-d3da-af03-a5ab-20e0e4095709'),
        title: 'Encore un post',
        content: 'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis. Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis. Consectetur adipiscing elit, sed do eiusmod.',
        createdAt: new Date('2019-02-22T15:11:45'),
        loveIts: -2,
    },
];