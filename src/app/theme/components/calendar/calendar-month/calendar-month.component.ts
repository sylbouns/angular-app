import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../calendar-event';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit, OnChanges {
  @Input() events: CalendarEvent[] = [];
  @Input() filteredEvents: CalendarEvent[] = [];
  @Input() date: Date = new Date();
  @Input() weekend: boolean = true;
  @Output() onDayClick: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayRange: EventEmitter<{ start: Date, end: Date }> = new EventEmitter<{ start: Date, end: Date }>();
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();
  @Output() onEventMove: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  public start: Date;
  public end: Date;
  public weeks: Date[] = [];

  private dumbEvent: CalendarEvent;
  private dumbStart: Date;

  constructor(public df: DateFsnService) { }

  ngOnInit(): void {
    this.setWeeks();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) this.setWeeks();
    if (changes.events) this.setMonthFilteredEvents(changes.events.currentValue);
    if (changes.weekend) this.setMonthFilteredEvents(this.events);
  }

  setWeeks(): void {
    this.start = this.df.startOfWeek(this.df.startOfMonth(this.date));
    this.end = this.df.endOfWeek(this.df.endOfMonth(this.date));
    let date = this.date;
    this.weeks = [];
    while (!this.df.isSameWeek(date, this.start)) date = this.df.subWeeks(date, 1);
    while (!this.df.isSameWeek(date, this.df.addWeeks(this.end, 1))) {
      this.weeks.push(date);
      date = this.df.addWeeks(date, 1);
    }
  }

  setMonthFilteredEvents(events: CalendarEvent[]) {
    this.filteredEvents = events.filter(event => this.df.areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end }
    ));
  }

  formatWeekDayName(day: number) {
    return this.df.format(this.df.addDays(this.start, day), 'iii');
  }

  setDate(date: Date): void {
    this.date = date;
    this.setWeeks();
  }

  weekendChange($event: MatSlideToggleChange) {
    this.weekend = $event.checked;
    this.setWeeks();
  }

  today(): void {
    this.setDate(new Date());
  }

  nextMonth(): void {
    this.setDate(this.df.addMonths(this.date, 1));
  }

  previousMonth(): void {
    this.setDate(this.df.subMonths(this.date, 1));
  }

  // Dumb Event

  isEditing(): boolean {
    return this.dumbEvent != undefined;
  }

  onDayMousedown(date): void {
    if (this.createDumbEvent(date)) this.events = [ ...this.events ];
  }

  onDayMouseenter(date): void {
    if (this.isEditing() && this.updateDumbEvent(date)) this.events = [ ...this.events ];
  }

  onDayMouseup(date): void {
    if (this.isEditing() && !this.isDayClick(date)) this.onDayRange.emit(this.dumbEvent);
    this.dumbEvent = undefined;
    this.dumbStart = undefined;
  }

  isDayClick(date): boolean {
    return date == this.dumbStart;
  }

  onMonthMouseleave(): void {
    if (this.dumbEvent) this.onDayRange.emit(this.dumbEvent);
    this.stopEdit();
  }

  stopEdit(): void {
    this.dumbEvent = undefined;
    this.dumbStart = undefined;
  }

  startEdit(date: Date): void {
    this.dumbStart = date;
    this.dumbEvent = {
      label: "(Sans titre)",
      start: date,
      end: date,
      allday: true,
      data: null,
    }
  }

  createDumbEvent(date: Date): boolean {
    if (this.isEditing()) return this.updateDumbEvent(date);
    this.deleteDumbEvent();
    this.startEdit(date);
    this.events.push(this.dumbEvent);
    return true;
  }

  getDumbEventIndex(): number {
    return this.events.findIndex(event => event.label == "(Sans titre)");
  }

  updateDumbEvent(date: Date): boolean {
    // Not editing
    if (!this.isEditing()) return this.createDumbEvent(date);
    // dumbEvent not found
    let index = this.getDumbEventIndex();
    if (index == -1) {
      this.stopEdit();
      return this.createDumbEvent(date);
    }
    // dumbEvent unchanged
    if (date == this.events[index].start || date == this.events[index].end) return false;
    // Update left or right
    if (date > this.dumbStart) {
      this.dumbEvent.start = this.dumbStart;
      this.dumbEvent.end = date;
    } else {
      this.dumbEvent.start = date;
      this.dumbEvent.end = this.dumbStart;
      this.dumbEvent.end = this.df.addDays(this.dumbStart, 1);
    }
    this.events[index] = this.dumbEvent;
    return true;
  }

  deleteDumbEvent(): boolean {
    let index = this.getDumbEventIndex();
    if (index != -1) this.events.splice(index, 1);
    this.stopEdit();
    return index > -1;
  }
}
