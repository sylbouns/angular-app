import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { format, areIntervalsOverlapping, differenceInDays, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth } from 'date-fns';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../../calendar-event';

class GridEvent {
  public event: CalendarEvent;
  public start: number;
  public end: number;
  public top?: string;
  public left?: string;
  public width?: string;
}

class GridRowsEvent {
  public completion: number = 0;
  public events: GridEvent[] = [];
}

@Component({
  selector: 'calendar-month-week',
  templateUrl: './calendar-month-week.component.html',
  styleUrls: ['./calendar-month-week.component.scss']
})
export class CalendarMonthWeekComponent implements OnInit, OnChanges {
  @Input() events: CalendarEvent[];
  @Input() date: Date = new Date();
  @Input() context: Date;
  @Input() weekend: boolean = false;
  @Input() showDayEvents: boolean = false;
  @Input() isEditing: boolean = false;
  @Output() onDayClick: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMousedown: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMouseenter: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMouseup: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  public days: Date[];
  public start: Date;
  public end: Date;
  public gridRows: GridEvent[][];
  private length: number;

  constructor(public df: DateFsnService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) this.setDays();
    if (changes.events) this.setEventsWeekFiltered();
    if (changes.weekend) this.setEventsWeekFiltered();
  }

  setEventsWeekFiltered() {
    this.gridRows = [];
    this.events = this.events.filter(event => areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end }
    )).sort((a, b) => this.sortEvents(a, b));
    this.events.map(event => this.insertEventInGrid(event));
  }

  sortEvents(a: CalendarEvent, b: CalendarEvent): number {
    let aStart = a.start > this.start ? a.start : this.start;
    let bStart = b.start > this.start ? b.start : this.start;
    let aEnd = a.end < this.end ? a.end : this.end;
    let bEnd = b.end < this.end ? b.end : this.end;
    if (aStart > bStart) return 1;
    if (aStart < bStart) return -1;
    if (aEnd < bEnd) return 1;
    if (aEnd > bEnd) return -1;
    return 0;
  }

  insertEventInGrid(event: CalendarEvent) {
    let gridEvent = new GridEvent();
    gridEvent.event = event;
    gridEvent.start = Math.max(this.df.getTime(event.start) - this.df.getTime(this.start), 0);
    gridEvent.end = Math.min(this.df.getTime(event.end) - this.df.getTime(this.start), this.length); // 1 week
    if (gridEvent.start == gridEvent.end) gridEvent.end = Math.min(gridEvent.end + 86400000, this.length); // Add 1 day

    this.insertGridEvent(gridEvent);
  }

  insertGridEvent(gridEvent: GridEvent, row: number = 0) {
    let index = this.getGridEventIndexInRow(gridEvent, row);
    if (index != -1) return this.insertGridEventInRow(gridEvent, row, index);
    return this.insertGridEvent(gridEvent, row + 1)
  }

  getGridEventIndexInRow(gridEvent: GridEvent, row: number = 0) {
    if (this.gridRows[row] == undefined) return 0;

    return this.gridRows[row].findIndex((rowEvent, index, row) => {
      if (gridEvent.start < rowEvent.end) return false;
      if (row[index - 1] == undefined || gridEvent.end <= row[index - 1].start) return true;
      return false;
    });
  }

  insertGridEventInRow(gridEvent: GridEvent, row: number = 0, index: number = 0): boolean {
    if (this.gridRows[row] == undefined) this.gridRows[row] = [];
    gridEvent.top = row * 30 + 'px';
    gridEvent.left = gridEvent.start / this.length * 100 + '%';
    gridEvent.width = (gridEvent.end - gridEvent.start) / this.length * 100 + '%';
    this.gridRows[row].splice(index, 0, gridEvent);
    return true;
  }

  setDays(): void {
    this.start = startOfWeek(this.date, { weekStartsOn: 1 });
    this.end = endOfWeek(this.date, { weekStartsOn: 1 });
    if (!this.weekend) this.end = this.df.subDays(this.end, 2);
    this.length = this.df.getTime(this.end) - this.df.getTime(this.start);
    this.days = eachDayOfInterval({ start: this.start, end: this.end });
  }
}
