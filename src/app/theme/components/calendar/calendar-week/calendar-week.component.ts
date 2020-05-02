import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../calendar-event';
import { CalendarEditor } from '../calendar.editor';

class GridEvent {
  public event: CalendarEvent;
  public start: number;
  public end: number;
  public top?: string;
  public left?: string;
  public width?: string;
}

@Component({
  selector: 'calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: ['./calendar-week.component.scss']
})
export class CalendarWeekComponent implements OnInit, OnChanges {
  @Input() events: CalendarEvent[];
  @Input() date: Date = new Date();
  @Input() context: Date;
  @Input() weekend: boolean = true;
  @Input() showDayNames: boolean = false;
  @Input() showDayEvents: boolean = false;
  @Input() eventLineHeight: number = 30; // pixels

  public days: Date[];
  public start: Date;
  public end: Date;
  public filteredEvents: CalendarEvent[] = [];
  public eventsGridRows: GridEvent[][];
  private startTime: number;
  private length: number;

  constructor(
    public editor: CalendarEditor,
    public df: DateFsnService
  ) { }

  ngOnInit(): void {
    this.setDays();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date || changes.weekend) this.setDays();
    if (changes.events) this.refreshEventsGrid(changes.events.currentValue);
    if (changes.date || changes.weekend) this.refreshEventsGrid(this.events);
  }

  setDays(): void {
    this.start = this.df.startOfWeek(this.date);
    this.end = this.df.endOfWeek(this.date);
    if (!this.weekend) this.end = this.df.subDays(this.end, 2);
    this.startTime = this.df.getTime(this.start);
    this.length = this.df.getTime(this.end) - this.startTime;
    this.days = this.df.eachDayOfInterval({ start: this.start, end: this.end });
  }

  refreshEventsGrid(events: CalendarEvent[]): void {
    this.setWeekFilteredEvents(events);
    this.refreshEventsGridRows();
  }

  setWeekFilteredEvents(events: CalendarEvent[]) {
    this.filteredEvents = events.filter(event => this.df.areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end ? event.end : event.start }
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
    let start = event.allday || !event.end || this.df.isSameDay(event.start, event.end) ? this.df.startOfDay(event.start): event.start;
    let end = event.allday || !event.end || this.df.isSameDay(event.start, event.end) ? this.df.endOfDay(event.end ? event.end : event.start): event.end;
    gridEvent.event = event;
    gridEvent.start = Math.max(this.df.getTime(start) - this.startTime, 0);
    gridEvent.end = Math.min(this.df.getTime(end) - this.startTime, this.length); // 1 week
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

  formatWeekDayName(day: number) {
    return this.df.format(this.df.addDays(this.start, day), 'iii');
  }
}
