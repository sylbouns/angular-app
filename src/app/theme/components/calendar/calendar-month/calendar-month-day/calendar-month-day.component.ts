import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../../calendar-event';
import { CalendarEditor } from '../../calendar-editor';
import { CalendarNav } from '../../calendar-nav';

@Component({
  selector: 'calendar-month-day',
  templateUrl: './calendar-month-day.component.html',
  styleUrls: ['./calendar-month-day.component.scss']
})
export class CalendarMonthDayComponent implements OnChanges {
  @Input() events: CalendarEvent[] = [];
  @Input() date: Date = new Date();
  @Input() out: boolean = false;
  @Input() editor: CalendarEditor;
  @Input() nav: CalendarNav;

  public start: Date;
  public end: Date;
  public filteredEvents: CalendarEvent[] = [];

  constructor(
    public df: DateFsnService,
  ) { }

  ngOnInit(): void {
    this.start = this.df.startOfDay(this.date);
    this.end = this.df.endOfDay(this.date);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events) this.setDayFilteredEvents(changes.events.currentValue);
  }

  setDayFilteredEvents(events: CalendarEvent[]) {
    this.filteredEvents = events.filter(event => this.df.areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end ? event.end : event.start }
    ));
  }

}
