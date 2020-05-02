import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from './calendar-event';
import { CalendarEditor } from './calendar.editor';

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

  constructor(public editor: CalendarEditor) {
  }

  ngOnInit(): void {
    this.editor.eventChanged.subscribe(event =>  this.events = this.editor.getEditedEvents(event, this.events));
    this.editor.eventFixed.subscribe(event => this.onEventEdit.emit(event));
  }

  onCalendarMouseleave(): void { this.editor.stop(); }
}
