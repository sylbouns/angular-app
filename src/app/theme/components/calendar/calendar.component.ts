import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from './calendar-event';
import { CalendarEditor } from './calendar.editor';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DateFsnService } from '@app/theme/services/date-fsn.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];
  @Input() date: Date = new Date();
  @Input() weekend: boolean = true;
  @Input() view: 'month' | 'week' = 'week';
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();
  @Output() onEventEdit: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  constructor(
    public editor: CalendarEditor,
    public df: DateFsnService
  ) { }

  ngOnInit(): void {
    this.editor.eventChanged.subscribe(event =>  this.events = this.editor.getEditedEvents(event, this.events));
    this.editor.eventFixed.subscribe(event => this.onEventEdit.emit(event));
  }

  onCalendarMouseleave(): void { this.editor.stop(); }

  getCalendarTitle(): string {
    switch (this.view) {
      case 'month': return this.df.format(this.date, 'MMMM y');
      case 'week': return this.getWeekCalendarTitle();
    }
  }

  getWeekCalendarTitle(): string {
    let start = this.df.startOfWeek(this.date);
    let end = this.df.endOfWeek(this.date);
    let title = this.df.format(start, 'MMMM');
    if (!this.df.isSameMonth(start, end)) title+= this.df.format(end, '- MMMM');
    title+= this.df.format(end, ' yyyy');
    title+= ' (semaine ' + this.df.format(this.date, 'w') + ')';
    return title;
  }

  setView(event): void {
    this.view = event.value;
  }

  weekendChange($event: MatSlideToggleChange) {
    this.weekend = $event.checked;
  }

  setDate(date: Date): void {
    this.date = date;
  }

  today(): void {
    this.setDate(new Date());
  }

  next(): void {
    switch (this.view) {
      case 'month': this.setDate(this.df.addMonths(this.date, 1)); break;
      case 'week': this.setDate(this.df.addWeeks(this.date, 1)); break;
    }
  }

  previous(): void {
    switch (this.view) {
      case 'month': this.setDate(this.df.subMonths(this.date, 1)); break;
      case 'week': this.setDate(this.df.subWeeks(this.date, 1)); break;
    }
  }
}
