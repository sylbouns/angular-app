import { Component, OnInit } from '@angular/core';
import { EventService } from '@app/event/event.service';
import { Event } from '@app/event/event.model';
import { CalendarEvent } from '@app/theme/components/calendar/calendar-event';
import { EventDialogComponent } from '@app/event/event-dialog/event-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit {
  public events: Event[];
  public calendarEvents: CalendarEvent[] = [];

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      this.events = events;
      this.refreshCalendarEvents(events);
    });
  }

  refreshCalendarEvents(events: Event[]): void {
    this.calendarEvents = [];
    events.map(event => {
      let calendarEvent = new CalendarEvent();
      calendarEvent.label = event.label;
      calendarEvent.start = event.start;
      calendarEvent.end = event.end;
      calendarEvent.allday = event.allday;
      calendarEvent.data = new Event();
      Object.assign(calendarEvent.data, event);
      this.calendarEvents.push(calendarEvent);
    });
  }

  eventEdit(calendarEvent: CalendarEvent): void {
    let event = calendarEvent.data;
    if (event) {
      event.start = calendarEvent.start;
      event.end = calendarEvent.end;
      this.eventDialog(event, 'edit');
    } else {
      event = new Event();
      event.start = calendarEvent.start;
      event.end = calendarEvent.end;
      event.allday = calendarEvent.allday;
      this.eventDialog(event, 'add');
    }
  }
  
  eventView(calendarEvent: CalendarEvent): void {
    let event = calendarEvent.data;
    if (event) this.eventDialog(event, 'view');
  }

  eventDialog(event: Event, action: 'add' | 'edit' | 'view'): void {
    const dialogRef = this.dialog.open(EventDialogComponent, { data: { event: event, action: action } });
    dialogRef.afterClosed().subscribe(result => this.refreshCalendarEvents(this.events) );  
  }
}
