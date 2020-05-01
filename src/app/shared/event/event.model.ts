import { Guid } from 'guid-typescript';

export class Event {
    public id: Guid;
    public label: string;
    public start: Date;
    public end: Date;
    public allday: boolean;
    public comment: string;
}
