import { Component, Input, OnInit } from '@angular/core';
import { format, areIntervalsOverlapping, differenceInDays, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth } from 'date-fns';
import { fr } from 'date-fns/esm/locale'
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EventService } from '../event/event.service';
import { Event } from '../event/event.model';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() weekend: boolean = false;
  public days: Date[];
  public start: Date;
  public end: Date;
  public events: Event[] = [];
  public weeks: Array<Event[]> = []
  public gridEvents: {
    event: Event,
    rows: string,
    cols: string
  }[] = [];

  constructor(private eventService: EventService) {
    this.setDays();
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => this.setWeeksEvents(events));
  }

  setWeeksEvents(events: Event[]) {
    this.gridEvents = [];
    events.map(event => areIntervalsOverlapping(
      { start: event.start, end: event.end },
      { start: this.start, end: this.end },
    ) ? this.addWeekEvent(event) : false);
  }

  addWeekEvent(event) {
    const maxEnd = differenceInDays(this.end, this.start);
    let start = Math.max(0, differenceInDays(event.start, this.start));
    let end = Math.min(maxEnd, differenceInDays(event.end, this.start));
    for (var _i = 0; _i < maxEnd; _i += 7) {
      if (start <= _i + 7 && end >= _i) {
        this.gridEvents.push({
          event: event,
          rows: (Math.floor(_i / 7) + 1).toString() + " / " + (Math.floor(_i / 7) + 1).toString(),
          cols: (Math.max(0, start - _i) + 1 + 1).toString() + " / " + (Math.min(this.weekend ? 6 : 4, end - _i + 1) + 1 + 1).toString(),
        });
      }
    } 
  }

  setEventsMonthFiltered(events: Event[]) {
    this.events = events.filter(event => areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end }
    ));
  }

  setDays(): void {
    this.start = startOfWeek(startOfMonth(this.date), { weekStartsOn: 1 });
    this.end = endOfWeek(endOfMonth(this.date), { weekStartsOn: 1 });
    this.days = eachDayOfInterval({ start: this.start, end: this.end });
  }

  weekendChange($event: MatSlideToggleChange) {
    this.weekend = $event.checked;
  }

  setDate(date: Date): void {
    this.date = date;
    this.setDays();
    this.setEventsMonthFiltered(this.eventService.getEvents().value);
  }

  today(): void {
    this.setDate(new Date());
  }

  nextMonth(): void {
    this.setDate(addMonths(this.date, 1));
  }

  previousMonth(): void {
    this.setDate(subMonths(this.date, 1));
  }

  format(date: Date, f: string): string {
    return format(date, f, { locale: fr });
  }

  isSameMonth(date): boolean {
    return getMonth(date) == getMonth(this.date);
  }

  isWeekend(date): boolean {
    return isWeekend(date);
  }

  isFirstDayOfMonth(date): boolean {
    return isFirstDayOfMonth(date);
  }
}
