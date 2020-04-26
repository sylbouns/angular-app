import { Guid } from 'guid-typescript';

export class Event {
    public id: Guid;
    public start: Date;
    public end: Date;
    public label: string;
}
