import { Component, OnInit, Input } from '@angular/core';
import { Event } from '@app/shared/event/event.model';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EventDialogComponent } from '@app/shared/event/event-dialog/event-dialog.component';

@Component({
  selector: 'calendar-month-event',
  templateUrl: './calendar-month-event.component.html',
  styleUrls: ['./calendar-month-event.component.scss']
})
export class CalendarMonthEventComponent implements OnInit {
  @Input() event: Event;

  constructor(public dialog: MatDialog, public df: DateFsnService) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EventDialogComponent, { data: { event: this.event, action: 'view' } });

    dialogRef.afterClosed().subscribe(result => result ? this.event = result.event : false );
  }

}
