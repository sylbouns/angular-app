import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from '../../calendar-event';

@Component({
  selector: 'calendar-month-day',
  templateUrl: './calendar-month-day.component.html',
  styleUrls: ['./calendar-month-day.component.scss']
})
export class CalendarMonthDayComponent implements OnChanges {
  @Input() events: CalendarEvent[] = [];
  @Input() date: Date = new Date();
  @Input() out: boolean = false;
  @Output() onDayClick: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMousedown: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMouseenter: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMouseup: EventEmitter<Date> = new EventEmitter<Date>();

  public filteredEvents: CalendarEvent[] = [];

  constructor(
    public df: DateFsnService,
    public dialog: MatDialog,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.events) this.setDayFilteredEvents(changes.events.currentValue);
  }

  setDayFilteredEvents(events: CalendarEvent[]) {
    this.filteredEvents = events.filter(event =>
      this.df.isSameDay(this.date, event.start) || this.df.isSameDay(this.date, event.end) ||
      (this.df.isBefore(this.date, event.end) && this.df.isAfter(this.date, event.start))
    );
  }

}
