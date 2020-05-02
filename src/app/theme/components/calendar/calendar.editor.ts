import { EventEmitter, Injectable } from '@angular/core';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from './calendar-event';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CalendarEditor {
  public event: CalendarEvent;
  public initial: CalendarEvent;
  public expand: 'start' | 'end';
  public drag: Date;

  public eventChanged: Subject<CalendarEvent> = new Subject<CalendarEvent>();
  public eventFixed: Subject<CalendarEvent> = new Subject<CalendarEvent>();

  constructor(public df: DateFsnService) { }

  getEditedEvents(event: CalendarEvent, events: CalendarEvent[]): CalendarEvent[] {
    let index = events.findIndex(e => e.id == event.id);
    if (index != -1) {
      events.splice(index, 1, event);
      events = [...events];
    } else events = [event, ...events]
    return events;
  }

  isEditing(): boolean {
    return this.event != undefined;
  }

  isEditingEvent(event: CalendarEvent): boolean {
    return this.isEditing() && this.event.id == event.id;
  }

  isDragging(): boolean {
    return this.drag !== undefined;
  }

  start(date: Date): void {
    if (this.isEditing()) this.expandEvent(date);
    else this.newEvent(date);
  }

  newEvent(date: Date): void {
    this.event = new CalendarEvent();
    this.event.label = "(Sans titre)";
    this.event.start = date;
    this.setInitial(this.event);
    this.eventChanged.next(this.event);
  }

  setInitial(event: CalendarEvent): void {
    this.initial = new CalendarEvent();
    this.initial.start = event.start;
    this.initial.end = event.end;
  }

  startExpand(event: CalendarEvent, position: 'start' | 'end'): void {
    this.event = event;
    this.setInitial(this.event);
    this.expand = position;
  }

  startDrag(event: CalendarEvent): void {
    this.event = event;
    this.setInitial(this.event);
    this.drag = null;
  }

  clean(): void {
    this.event = undefined;
    this.initial = undefined;
    this.expand = undefined;
    this.drag = undefined;
  }

  update(date): void {
    if (this.isEditing()) this.isDragging() ? this.dragEvent(date) : this.expandEvent(date);
  }

  stop(date?: Date): void {
    if (this.isEditing() && this.isDayClick(date)) this.event.end = undefined;
    if (this.isEditing()) this.eventFixed.next(this.event);
    this.clean();
  }

  isDayClick(date: Date): boolean {
    return date ? date == this.initial.start : false;
  }

  expandEvent(date: Date) {
    if (date <= this.initial.start) {
      this.event.start = this.applyTimeOnDay(this.initial.start, date);
      this.event.end = this.initial.end ? this.initial.end : this.initial.start;
    } else if (!this.initial.end) {
      this.event.start = this.initial.start;
      this.event.end = this.applyTimeOnDay(this.initial.start, date);;
    } else if (date >= this.initial.end) {
      this.event.start = this.initial.start;
      this.event.end = this.applyTimeOnDay(this.initial.end, date);
    } else if (this.expand == 'start') {
      this.event.start = this.applyTimeOnDay(this.initial.start, date);
      this.event.end = this.initial.end ? this.initial.end : this.initial.start;
    } else if (this.expand == 'end') {
      this.event.start = this.initial.start;
      this.event.end = this.applyTimeOnDay(this.initial.end, date);
    }
    this.eventChanged.next(this.event);
  }

  applyTimeOnDay(time: Date, day: Date): Date {
    if (!time) return day;
    day.setHours(time.getHours(), time.getMinutes());
    return day;
  }

  dragEvent(date: Date): void {
    if (this.drag == null) this.drag = date;
    else {
      let move = date.getTime() - this.drag.getTime();
      this.event.start = this.df.addMilliseconds(this.initial.start, move);
      this.event.end = this.initial.end ? this.df.addMilliseconds(this.initial.end, move) : this.initial.end;
    }
    this.eventChanged.next(this.event);
  }
}