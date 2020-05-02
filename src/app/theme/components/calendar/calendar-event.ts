import { Guid } from 'guid-typescript';

export class CalendarEvent {
    public id: Guid = Guid.create();
    public label: string = '';
    public start: Date = new Date();
    public end?: Date;
    public allday: boolean = true;
    public data?: any;
}
