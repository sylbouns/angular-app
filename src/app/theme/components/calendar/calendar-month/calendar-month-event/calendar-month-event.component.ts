import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../../calendar-event';

@Component({
  selector: 'calendar-month-event',
  templateUrl: './calendar-month-event.component.html',
  styleUrls: ['./calendar-month-event.component.scss']
})
export class CalendarMonthEventComponent implements OnInit {
  @Input() event: CalendarEvent;
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  constructor(public df: DateFsnService) { }

  ngOnInit(): void {
  }
}
