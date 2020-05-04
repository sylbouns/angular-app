import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CalendarEvent } from '../calendar-event';
import { CalendarNav } from '../calendar-nav';
import { DateFsnService } from '@app/theme/services/date-fsn.service';

const df = new DateFsnService();

@Component({
  selector: 'calendar-year',
  templateUrl: './calendar-year.component.html',
  styleUrls: ['./calendar-year.component.scss']
})
export class CalendarYearComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];
  @Input() filteredEvents: boolean[] = [];
  @Input() date: Date;
  @Input() nav: CalendarNav;

  public start: Date;
  public end: Date;
  public year: Year;
  public dayNames: string[];

  constructor(
    public df: DateFsnService
  ) { }

  ngOnInit(): void {
    this.setDayNames();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) this.setYear();
    if (changes.events) this.setYearFilteredEvents(changes.events.currentValue);
    // if (changes.weekend) this.setMonthFilteredEvents(this.events);
  }

  setYear(): void {
    this.year = new Year(this.date);
    this.start = this.df.startOfWeek(this.df.startOfYear(this.date));
    this.end = this.df.endOfWeek(this.df.endOfYear(this.date));
  }

  setDayNames(): void {
    this.dayNames = [];
    let cursor = this.df.startOfWeek(new Date());
    for (let i = 0; i <= 6; i++) {
      this.dayNames.push(this.df.format(cursor, 'iiiii'));
      cursor = this.df.addDays(cursor, 1);
    }
  }

  setYearFilteredEvents(events: CalendarEvent[]) {
    this.filteredEvents = [];
    console.log(this.start, this.end);
    this.df.eachDayOfInterval({ start: this.start, end: this.end}).forEach(date => this.filteredEvents[date.getTime()] = false);
    events.filter(event => this.df.areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end ? event.end : event.start }
    )).map(event => {
      if (event.end) this.df.eachDayOfInterval({start: event.start, end: event.end}).forEach(
        date => this.filteredEvents[this.df.format(date, 'yyyyMMdd')] = true
      );
      else this.filteredEvents[this.df.format(event.start, 'yyyyMMdd')] = true;
    });
  }

}

class Year {
  public date: Date;
  public months: Month[] = [];

  constructor(date: Date) {
    this.date = new Date(date);
    let cursor = df.startOfYear(date);
    for (let i = 0; i < 12; i++) {
      this.months.push(new Month(cursor));
      cursor = df.addMonths(cursor, 1);
    }
  }
}

class Month {
  public date: Date;
  public name: string;
  public weeks: Week[] = [];

  constructor(date: Date) {
    this.date = new Date(date);
    this.name = df.format(this.date, 'MMMM');
    let cursor = df.startOfWeek(date);
    for (let i = 0; i < 6; i++) {
      this.weeks.push(new Week(cursor));
      cursor = df.addWeeks(cursor, 1);
    }
  }
}

class Week {
  public date: Date;
  public number: string;
  public days: Day[] = [];

  constructor(date: Date) {
    this.date = new Date(date);
    this.number = df.format(this.date, 'w');
    let cursor = new Date(date);
    for (let i = 0; i < 7; i++) {
      this.days.push(new Day(cursor));
      cursor = df.addDays(cursor, 1);
    }
  }
}

class Day {
  public date: Date;
  public number: string;
  public out: boolean;

  constructor(date: Date) {
    this.date = new Date(date);
    this.number = df.format(this.date, 'd');
  }
}
