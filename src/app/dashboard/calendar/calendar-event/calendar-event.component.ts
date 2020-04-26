import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent } from './calendar-event';

@Component({
  selector: 'calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent implements OnInit {
  @Input() event: CalendarEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
