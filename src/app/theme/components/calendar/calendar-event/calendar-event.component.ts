import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../calendar-event';
import { CalendarEditor } from '../calendar-editor';
import { CalendarNav } from '../calendar-nav';

@Component({
  selector: 'calendar-event',
  templateUrl: './calendar-event.component.html',
  styleUrls: ['./calendar-event.component.scss']
})
export class CalendarEventComponent implements OnInit {
  @Input() event: CalendarEvent;
  @Input() showStartTime: boolean = false;
  @Input() editor: CalendarEditor;
  @Input() nav: CalendarNav;
  
  constructor(
    public df: DateFsnService
  ) { }

  ngOnInit(): void {
  }
}
