import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Event } from './event.model';
import { events } from './event.mock';
import { Guid } from 'guid-typescript';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>(events);

  constructor() { }

  public getEvents() {
    return this.events;
  }

  private getEmptyEvent() {
    const event: Event = new Event();
    return event;
  }

  private getEventIndex(id: Guid) {
    return this.events.getValue().findIndex((event: Event) => event.id.equals(id));
  }

  public getEvent(id: Guid): Observable<Event> {
    return this.getEvents().pipe(
      map(events => events.find((event: Event) => event.id.equals(id)))
    );
  }

  public isNewEvent(event:Event) {
    return event.id == undefined;
  }

  public saveEvent(event: Event) {
    this.isNewEvent(event) ? this.addEvent(event) : this.updateEvent(event);
  }

  public deleteEvent(id: Guid) {
    console.log('Delete event', id);
    this.events.getValue().splice(this.getEventIndex(id), 1);
    this.emmitEvents();
  }

  private addEvent(event: Event) {
    console.log('Add event', event);
    let newEvent = this.getEmptyEvent();
    newEvent.id = Guid.create();
    this.events.getValue().push({ ...newEvent, ...event })
    this.emmitEvents();
  }

  private updateEvent(event: Event) {
    console.log('Update post', event);
    this.events.getValue().splice(this.getEventIndex(event.id), 1, event);
    this.emmitEvents();
  }

  private emmitEvents() {
    this.events.next(this.events.getValue());
  }

}
