import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '@app/shared/event/event.service';
import { format, areIntervalsOverlapping, differenceInDays, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth } from 'date-fns';
import { Event } from '@app/shared/event/event.model';
import { DateFsnService } from '@app/theme/services/date-fsn.service';

@Component({
  selector: 'calendar-month-week',
  templateUrl: './calendar-month-week.component.html',
  styleUrls: ['./calendar-month-week.component.scss']
})
export class CalendarMonthWeekComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() context: Date;
  @Input() weekend: boolean = false;
  public days: Date[];
  public start: Date;
  public end: Date;
  private min: number;
  private max: number;
  private length: number;
  public events: Event[] = [];
  public grid: { 
    event: Event,
    top: string,
    left: string,
    width: string,
    start: number,
    end: number,
  }[] = [];
  private gridRow: number[];

  constructor( private eventService: EventService, public df: DateFsnService) { }

  ngOnInit(): void {
    this.setDays();
    this.eventService.getEvents().subscribe((events: Event[]) => this.setEventsWeekFiltered(events));
  }

  setEventsWeekFiltered(events: Event[]) {
    this.grid = [];
    this.gridRow = [];
    events.filter(event => areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end }
    )).sort((a, b) => {
      if (a.start > b.start) return 1;
      if (a.start < b.start) return -1;
      if (a.end < b.end) return 1;
      if (a.end > b.end) return -1;
      return 0;
    }).map(event => this.insertEventInGrid(event));
  }

  insertEventInGrid(event: Event) {
    let start = Math.max(this.df.getTime(event.start), this.min);
    let end = Math.min(this.df.getTime(event.end), this.max);
    if (start == end) end = Math.min(end + 86400000, this.max);
    let { top, left } = this.getTopInGrid(start - this.min, end - this.min);
    this.grid.push({
      event: event,
      top: top,
      left: (start - this.min) / this.length * 100 + '%',
      width: (end - start) / this.length * 100 + '%',
      start: start,
      end: end,        
    });
  }

  getTopInGrid(start: number, end: number, row:number = 0): { top: string, left: string } {
    let duration = end - start;
    if (this.gridRow[row] == undefined) this.gridRow[row] = 0;
    if (start >= this.gridRow[row]) {
      let left = (start - this.gridRow[row]) / this.length * 100 + '%';
      this.gridRow[row] = end;
      return {
        top: row * 30 + 'px',
        left: left,
      }
    }
    return this.getTopInGrid(start, end, row + 1);
  }

  setDays(): void {
    this.start = startOfWeek(this.date, { weekStartsOn: 1 });
    this.end = endOfWeek(this.date, { weekStartsOn: 1 });
    if (!this.weekend) this.end = this.df.subDays(this.end, 2);
    this.days = eachDayOfInterval({ start: this.start, end: this.end });
    this.min = this.df.getTime(this.start);
    this.max = this.df.getTime(this.end);
    this.length = this.max - this.min;
  }

  getEventStyles(event: Event) {
    let start = Math.max(this.df.getTime(event.start), this.min);
    let end = Math.min(this.df.getTime(event.end), this.max);
    if (start == end) end = Math.min(end + 86400000, this.max);
    return {
      marginLeft: (start - this.min) / this.length * 100 + '%',
      width: (end - start) / this.length * 100 + '%',
    }  
  }

}
