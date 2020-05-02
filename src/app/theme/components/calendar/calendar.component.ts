import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from './calendar-event';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];
  @Input() date: Date = new Date();
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();
  @Output() onEventEdit: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
