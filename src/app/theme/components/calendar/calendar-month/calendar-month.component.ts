import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { format, areIntervalsOverlapping, differenceInDays, isSameWeek, addWeeks, subWeeks, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth, addDays } from 'date-fns';
import { fr } from 'date-fns/esm/locale'
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../calendar-event';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];
  @Input() date: Date = new Date();
  @Input() weekend: boolean = true;
  @Output() onDayClick: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayRange: EventEmitter<{ start: Date, end: Date }> = new EventEmitter<{ start: Date, end: Date }>();
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  public start: Date;
  public end: Date;
  public weeks: Date[] = [];

  private dumbEvent: CalendarEvent;
  private dumbStart: Date;

  constructor(public df: DateFsnService) { }

  ngOnInit(): void {
    this.setWeeks();
  }

  setDate(date: Date): void {
    this.date = date;
    this.setWeeks();
  }

  setWeeks(): void {
    this.start = startOfWeek(startOfMonth(this.date), { weekStartsOn: 1 });
    this.end = endOfWeek(endOfMonth(this.date), { weekStartsOn: 1 });
    let date = this.date;
    this.weeks = [];
    while (!isSameWeek(date, this.start, { weekStartsOn: 1 })) date = subWeeks(date, 1);
    while (!isSameWeek(date, addWeeks(this.end, 1), { weekStartsOn: 1 })) {
      this.weeks.push(date);
      date = addWeeks(date, 1);
    }
  }

  weekendChange($event: MatSlideToggleChange) {
    this.weekend = $event.checked;
    this.setWeeks();
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

  // Dumb Event

  isEditing(): boolean {
    return this.dumbEvent != undefined;
  }

  onDayMousedown(date): void {
    if (this.createDumbEvent(date)) this.events = [...this.events];
  }

  onDayMouseenter(date): void {
    if (this.dumbEvent != undefined) {
      if (this.updateDumbEvent(date)) this.events = [...this.events];
    }
  }

  onDayMouseup(date): void {
    if (this.dumbEvent && date != this.dumbStart) this.onDayRange.emit({ start: this.dumbEvent.start, end: this.dumbEvent.end });
    this.dumbEvent = undefined;
    this.dumbStart = undefined;
  }

  onMonthMouseleave(): void {
    // if (this.deleteDumbEvent()) this.events = [...this.events];
    if (this.dumbEvent) this.onDayRange.emit({ start: this.dumbEvent.start, end: this.dumbEvent.end });
    this.dumbEvent = undefined;
    this.dumbStart = undefined;
  }

  createDumbEvent(date: Date): boolean {
    if (this.dumbEvent != undefined) return this.updateDumbEvent(date);
    this.deleteDumbEvent();
    this.dumbStart = date;
    this.dumbEvent = {
      start: date,
      end: date,
      label: "(Sans titre)",
      data: null,
    }
    this.events.push(this.dumbEvent);
    return true;
  }

  getDumbEventIndex(): number {
    return this.events.findIndex(event => event.label == "(Sans titre)");
  }

  updateDumbEvent(date: Date): boolean {
    if (this.dumbEvent == undefined) return this.createDumbEvent(date);
    let index = this.getDumbEventIndex();
    if (index == -1) {
      this.dumbEvent = undefined;
      return this.createDumbEvent(date);
    }
    if (date == this.events[index].start || date == this.events[index].end) return false;
    if (date > this.dumbStart) {
      date = addDays(date, 1);
      this.dumbEvent.start = this.dumbStart;
      this.dumbEvent.end = date;
    } else {
      this.dumbEvent.start = date;
      this.dumbEvent.end = this.dumbStart;
      this.dumbEvent.end = addDays(this.dumbStart, 1);
    }
    this.events[index] = this.dumbEvent;
    return true;
  }

  deleteDumbEvent(): boolean {
    let index = this.getDumbEventIndex();
    if (index != -1) this.events.splice(index, 1);
    this.dumbEvent = undefined;
    this.dumbStart = undefined;
    return index > -1;
  }
}
