import { Component, OnInit } from '@angular/core';
import { EventService } from '@app/event/event.service';
import { Event } from '@app/event/event.model';
import { CalendarEvent } from '@app/theme/components/calendar/calendar-event';
import { EventDialogComponent } from '@app/event/event-dialog/event-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
      this.calendarEvents.push({
        label: event.label,
        start: event.start,
        end: event.end,
        allday: event.allday,
        data: event,
      })
    });
  }

  addDialogDay(date: Date): void {
    let event = new Event();
    event.start = date;
    event.allday = true;
    this.addDialiog(event);
  }

  addDialogRange(range: CalendarEvent): void {
    let event = new Event();
    event.start = range.start;
    event.end = range.end;
    event.allday = range.allday;
    this.addDialiog(event);
  }

  addDialiog(event: Event): void {
    const dialogRef = this.dialog.open(EventDialogComponent, { data: { event: event, action: 'add' } });
    dialogRef.afterClosed().subscribe(result => this.refreshCalendarEvents(this.events));
    MatDialogConfig
  }

  eventDialog(event: CalendarEvent): void {
    if (event.data) {
      const dialogRef = this.dialog.open(EventDialogComponent, { data: { event: event.data, action: 'view' } });
      dialogRef.afterClosed().subscribe(result => this.refreshCalendarEvents(this.events));  
    } else this.addDialogRange(event);
  }

  updateEvent(event: CalendarEvent): void {
    console.log(event);
  }
}
