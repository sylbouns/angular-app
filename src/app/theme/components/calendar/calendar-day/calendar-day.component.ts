import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../calendar-event';
import { CalendarEditor } from '../calendar-editor';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { Grid } from './calendar-day.grid';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];
  @Input() editor: CalendarEditor;
  @Input() date: Date;
  @Input() minLength: number = 1800000;

  public start: Date;
  public end: Date;
  public times: Date[];
  public daylyEvents: CalendarEvent[];
  public alldayEvents: CalendarEvent[];
  public grid: Grid;
  
  constructor(
    public df: DateFsnService
  ) { }

  ngOnInit(): void {
    this.setDay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date) this.setDay();
    if (changes.events) this.setDayFilteredEvents(changes.events.currentValue);
    else if (changes.date) this.setDayFilteredEvents(this.events);
  }

  setDay(): void {
    this.start = this.df.startOfDay(this.date);
    this.end = this.df.endOfDay(this.date);
    this.times = [];
    for (let i = 0; i < 86400000; i+=300000) this.times.push(this.df.addMilliseconds(this.start, i));
  }

  setDayFilteredEvents(events: CalendarEvent[]) {
    this.alldayEvents = [];
    this.daylyEvents = [];
    events.filter(event => this.df.areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end ? event.end : event.start }
    )).sort((a, b) => this.sortEvents(a, b)).map(event => {
      if (event.allday || (event.start <= this.start && event.end >= this.end)) this.alldayEvents.push(event);
      else this.daylyEvents.push(event);
    });

    this.grid = new Grid(this.date, this.daylyEvents);
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

  editorStart($event, date: Date): void {
    // Click gauche
    if ($event.which == 1) this.editor.start(new Date(date), true);
  }

  editorStop(date?: Date): void {
    this.editor.stop(date ? new Date(date) : undefined);
  }

  editorUpdate(date: number): void {
    this.editor.update(new Date(date));
  }

  editorStartExpand($event, event: CalendarEvent, position: 'start' | 'end', editTime:boolean = false): void {
    // Click gauche
    if ($event.which == 1) this.editor.startExpand(event, position, editTime);
  }

  editorStartDrag($event, event: CalendarEvent, editTime:boolean = false): void {
    // Click gauche
    if ($event.which == 1) this.editor.startDrag(event, editTime);
  }
}
