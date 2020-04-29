import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { format, isSameDay, isAfter, isBefore } from 'date-fns';
import { fr } from 'date-fns/esm/locale'
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from '../../calendar-event';

@Component({
  selector: 'calendar-month-day',
  templateUrl: './calendar-month-day.component.html',
  styleUrls: ['./calendar-month-day.component.scss']
})
export class CalendarMonthDayComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];
  @Input() date: Date = new Date();
  @Input() context: Date;
  @Input() out: boolean = true;
  @Output() onDayClick: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMousedown: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMouseenter: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onDayMouseup: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(
    public df: DateFsnService,
    public dialog: MatDialog,
  ) { }

  mouse(date) {
    console.log(event);
  }
  ngOnInit(): void {
    this.eventsDayFilter(this.events);
  }

  eventsDayFilter(events: CalendarEvent[]) {
    this.events = events.filter(event =>
      isSameDay(this.date, event.start) || isSameDay(this.date, event.end) ||
      (isBefore(this.date, event.end) && isAfter(this.date, event.start))
    );
  }

  format(date: Date, f: string): string {
    return format(date, f, { locale: fr });
  }

}
