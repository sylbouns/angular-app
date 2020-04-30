import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
  @Input() eventLineHeight: number = 30; // pixels
  @Input() isEditing: boolean = false;
  @Output() onDayClick: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMousedown: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMouseenter: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMouseup: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  public days: Date[];
  public start: Date;
  public end: Date;
  public filteredEvents: CalendarEvent[] = [];
  public eventsGridRows: GridEvent[][];
  private length: number;

  constructor(public df: DateFsnService) { }

  ngOnInit(): void {
    this.setDays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date) this.setDays();
    if (changes.events) this.refreshEventsGrid(changes.events.currentValue);
    if (changes.weekend) this.refreshEventsGrid(this.events);
    if (changes.events || changes.weekend) this.refreshEventsGridRows();
  }

  setDays(): void {
    this.start = this.df.startOfWeek(this.date);
    this.end = this.df.endOfWeek(this.date);
    if (!this.weekend) this.end = this.df.subDays(this.end, 2);
    this.length = this.df.getTime(this.end) - this.df.getTime(this.start);
    this.days = this.df.eachDayOfInterval({ start: this.start, end: this.end });
  }

  refreshEventsGrid(events: CalendarEvent[]): void {
    this.setWeekFilteredEvents(events);
    this.refreshEventsGridRows();
  }

  setWeekFilteredEvents(events: CalendarEvent[]) {
    this.filteredEvents = events.filter(event => this.df.areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end }
    )).sort((a, b) => this.sortEvents(a, b));
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

  refreshEventsGridRows(): void {
    this.eventsGridRows = [];
    this.filteredEvents.map(event => this.insertEventInGrid(event));
  }

  insertEventInGrid(event: CalendarEvent) {
    let gridEvent = this.newGrigEvent(event);
    this.insertGridEvent(gridEvent);
  }

  newGrigEvent(event: CalendarEvent): GridEvent {
    let gridEvent = new GridEvent();
    gridEvent.event = event;
    gridEvent.start = Math.max(this.df.getTime(event.start) - this.df.getTime(this.start), 0);
    gridEvent.end = Math.min(this.df.getTime(event.end) - this.df.getTime(this.start), this.length); // 1 week
    if (gridEvent.start == gridEvent.end) gridEvent.end = Math.min(gridEvent.end + 86400000, this.length); // Add 1 day
    return gridEvent;
  }

  insertGridEvent(gridEvent: GridEvent, row: number = 0) {
    let index = this.getGridEventIndexInRow(gridEvent, row);
    if (index != -1) return this.insertGridEventInRow(gridEvent, row, index);
    return this.insertGridEvent(gridEvent, row + 1);
  }

  getGridEventIndexInRow(gridEvent: GridEvent, row: number = 0): number {
    if (this.eventsGridRows[row] == undefined) return 0;

    return this.eventsGridRows[row].findIndex((rowEvent, index, row) => {
      if (gridEvent.start < rowEvent.end) return false;
      if (row[index - 1] == undefined || gridEvent.end <= row[index - 1].start) return true;
      return false;
    });
  }

  insertGridEventInRow(gridEvent: GridEvent, row: number = 0, index: number = 0): void {
    if (this.eventsGridRows[row] == undefined) this.eventsGridRows[row] = [];
    gridEvent.top = row * this.eventLineHeight + 'px';
    gridEvent.left = gridEvent.start / this.length * 100 + '%';
    gridEvent.width = (gridEvent.end - gridEvent.start) / this.length * 100 + '%';
    this.eventsGridRows[row].splice(index, 0, gridEvent);
  }
}
