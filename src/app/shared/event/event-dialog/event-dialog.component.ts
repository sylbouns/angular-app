import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { NgForm } from '@angular/forms';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {
  @ViewChild("form") form: EventFormComponent;
  public event: Event;
  public action: string = 'view';
  public title: string;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: Event, action: string },
    public serviceEvent: EventService
  ) { }

  ngOnInit(): void {
    this.event = this.data.event;
    this.action = this.data.action;
    this.setTitle();
  }

  setTitle() {
    switch (this.action) {
      case 'add': this.title = "Add event"; break;
      case 'edit': this.title = "Edit event"; break;
      case 'view': this.title = this.event.label; break;
    }
  }

  edit() {
    this.action = 'edit';
    this.setTitle();
  }
  view() {
    this.action = 'view';
    this.setTitle()
  }
  delete() {
    this.serviceEvent.deleteEvent(this.event.id);
    this.dialogRef.close();
  }

  onKeypressed(event):void {
    if (event.key == "Enter" &&  this.form.submit()) this.dialogRef.close();
  }
}
