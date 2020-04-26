import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../event/event.service';
import { format, areIntervalsOverlapping, differenceInDays, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth } from 'date-fns';
import { Event } from '../../event/event.model';
import { DateFsnService } from '@app/theme/services/date-fsn.service';

@Component({
  selector: 'app-calendar-month-week',
  templateUrl: './calendar-month-week.component.html',
  styleUrls: ['./calendar-month-week.component.scss']
})
export class CalendarMonthWeekComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() weekend: boolean = false;
  public days: Date[];
  public start: Date;
  public end: Date;
  public events: Event[] = [];

  constructor( private eventService: EventService, public dateFns: DateFsnService) {
    this.setDays();
  }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => this.setEventsWeekFiltered(events));
  }

  setEventsWeekFiltered(events: Event[]) {
    this.events = events.filter(event => areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end }
    ));
  }

  setDays(): void {
    this.start = startOfWeek(this.date, { weekStartsOn: 1 });
    this.end = endOfWeek(this.date, { weekStartsOn: 1 });
    this.days = eachDayOfInterval({ start: this.start, end: this.end });
  }

  setDate(date: Date): void {
    this.date = date;
    this.setDays();
    this.setEventsWeekFiltered(this.eventService.getEvents().value);
  }
}
