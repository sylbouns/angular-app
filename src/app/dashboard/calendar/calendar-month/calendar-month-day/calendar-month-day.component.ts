import { Component, OnInit, Input } from '@angular/core';
import { format, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth } from 'date-fns';
import { fr } from 'date-fns/esm/locale'
import { Event } from '../../event/event.model';
import { EventService } from '../../event/event.service';

@Component({
  selector: 'calendar-month-day',
  templateUrl: './calendar-month-day.component.html',
  styleUrls: ['./calendar-month-day.component.scss']
})
export class CalendarMonthDayComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() showDayName: boolean = true;
  @Input() showMonthName: boolean = true;
  @Input() isSameMonth: boolean = true;
  @Input() isWeekend: boolean = true;
  public events: Event[] = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => this.eventsDayFilter(events) );
  }

  eventsDayFilter(events: Event[]) {
    this.events = events.filter(event =>
      isSameDay(this.date, event.start) || isSameDay(this.date, event.end) ||
      (isBefore(this.date, event.end) && isAfter(this.date, event.start))
    );
  }

  format(date: Date, f: string): string {
    return format(date, f, { locale: fr });
  }
}
