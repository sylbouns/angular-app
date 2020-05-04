import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../calendar-event';
import { CalendarEditor } from '../calendar-editor';
import { CalendarNav } from '../calendar-nav';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit, OnChanges {
  @Input() events: CalendarEvent[] = [];
  @Input() filteredEvents: CalendarEvent[] = [];
  @Input() date: Date;
  @Input() editor: CalendarEditor;
  @Input() nav: CalendarNav;
  @Input() weekend: boolean = true;

  public start: Date;
  public end: Date;
  public weeks: Date[] = [];

  constructor(
    public df: DateFsnService
  ) { }

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
      { start: event.start, end: event.end ? event.end : event.start }
    ));
  }

}
