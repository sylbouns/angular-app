import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input() event: Event;
  public isNewPost: boolean = true;
  public eventForm: FormGroup;

  @Output() onSubmit = new EventEmitter<string>();

  @ViewChild("form") form:NgForm;

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService) { }

  ngOnInit() {
    this.isNewPost = this.eventService.isNewEvent(this.event);
    this.eventForm = this.formBuilder.group({
      label: [this.event.label, Validators.required],
      start: [this.event.start, Validators.required],
      end: [this.event.end],
    });
  }

  onSubmitForm() {
    this.event.label = this.eventForm.value['label'];
    this.event.start = this.eventForm.value['start'];
    this.event.end = this.eventForm.value['end'];
    this.eventService.saveEvent(this.event);
    this.onSubmit.next('submit');
  }

  public submit(): boolean {
    if (this.form.invalid) return false;
    this.form.ngSubmit.emit();
    return true;
  }
}