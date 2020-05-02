import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../../calendar-event';
import { CalendarEditor } from '../../calendar.editor';

@Component({
  selector: 'calendar-month-event',
  templateUrl: './calendar-month-event.component.html',
  styleUrls: ['./calendar-month-event.component.scss']
})
export class CalendarMonthEventComponent implements OnInit {
  @Input() event: CalendarEvent;
  @Input() showStartTime: boolean = false;
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();
  
  constructor(
    public editor: CalendarEditor,
    public df: DateFsnService
  ) { }

  ngOnInit(): void {
  }
}
