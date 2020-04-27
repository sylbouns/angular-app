import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, AfterViewInit {
  @Input() event: Event;
  public isNewPost: boolean = true;
  public eventForm: FormGroup;

  @Output() onSubmit = new EventEmitter<string>();

  @ViewChild("form") form:NgForm;
  @ViewChild("label") label: ElementRef<any>;

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

  ngAfterViewInit() {
    this.label.nativeElement.focus();
  }

  onSubmitForm() {
    this.event.label = this.eventForm.value['label'];
    this.event.start = this.eventForm.value['start'];
    this.event.end = this.eventForm.value['end'];
    this.eventService.saveEvent(this.event);
    this.onSubmit.next('submit');
  }

  public submit() {
    this.form.ngSubmit.emit();
  }
}
