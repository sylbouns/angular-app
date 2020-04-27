import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from './calendar-event/calendar-event';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];

  constructor() { 
    this.eventsGenerator();
  }

  eventsGenerator() {
    const quantity = 15;
    for (let i = 0; i < quantity; i++) {
      this.events.push(new CalendarEvent());
    }
  }

  ngOnInit(): void {
  }

}
