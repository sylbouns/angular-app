import { Component, Input, OnInit } from '@angular/core';
import { format, areIntervalsOverlapping, differenceInDays, isSameWeek, addWeeks, subWeeks, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth } from 'date-fns';
import { fr } from 'date-fns/esm/locale'
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EventService } from '../event/event.service';
import { Event } from '../event/event.model';
import { DateFsnService } from '@app/theme/services/date-fsn.service';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() weekend: boolean = true;
  public start: Date;
  public end: Date;
  public weeks: Date[] = [];

  constructor(private eventService: EventService, public df: DateFsnService) { }

  ngOnInit(): void {
    this.setWeeks();
  }

  setDate(date: Date): void {
    this.date = date;
    this.setWeeks();
  }
  
  setWeeks(): void {
    this.start = startOfWeek(startOfMonth(this.date), { weekStartsOn: 1 });
    this.end = endOfWeek(endOfMonth(this.date), { weekStartsOn: 1 });
    let date = this.date;
    this.weeks = [];
    while (!isSameWeek(date, this.start, { weekStartsOn: 1 })) date = subWeeks(date, 1);
    while (!isSameWeek(date, addWeeks(this.end, 1), { weekStartsOn: 1 })) {
      this.weeks.push(date);
      date = addWeeks(date, 1);
    }
  }
  
  weekendChange($event: MatSlideToggleChange) {
    this.weekend = $event.checked;
    this.setWeeks();
  }

  today(): void {
    this.setDate(new Date());
  }

  nextMonth(): void {
    this.setDate(addMonths(this.date, 1));
  }

  previousMonth(): void {
    this.setDate(subMonths(this.date, 1));
  }
}
