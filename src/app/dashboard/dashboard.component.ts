import { Component, OnInit } from '@angular/core';
import { EventService } from '@app/shared/event/event.service';
import { Event } from '@app/shared/event/event.model';
import { CalendarEvent } from '@app/theme/components/calendar/calendar-event';
import { EventDialogComponent } from '@app/shared/event/event-dialog/event-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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
        start: event.start,
        end: event.end ? event.end : event.start,
        label: event.label,
        data: event,
      })
    });
  }

  addDialogDay(date: Date): void {
    let event = new Event();
    event.start = date;
    this.addDialiog(event);
  }

  addDialogRange(range: { start: Date, end: Date }): void {
    let event = new Event();
    event.start = range.start;
    event.end = range.end;
    this.addDialiog(event);
  }

  addDialiog(event: Event): void {
    const dialogRef = this.dialog.open(EventDialogComponent, { data: { event: event, action: 'add' } });
    dialogRef.afterClosed().subscribe(result => this.refreshCalendarEvents(this.events));
  }

  eventDialog(event: CalendarEvent): void {
    if (event.data) {
      const dialogRef = this.dialog.open(EventDialogComponent, { data: { event: event.data, action: 'view' } });
      dialogRef.afterClosed().subscribe(result => this.refreshCalendarEvents(this.events));  
    } else this.addDialogRange({ start: event.start, end: event.end });
  }

  updateEvent(event: CalendarEvent): void {
    console.log(event);
  }
}
