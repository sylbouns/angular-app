import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { MatInput } from '@angular/material/input';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit, AfterViewInit {
  @Input() event: Event;
  @Output() onSubmit = new EventEmitter<string>();
  @ViewChild("form") form: NgForm;
  @ViewChild("label") labelInput: MatInput;
  @ViewChild("startDay") startDayInput: MatInput;
  @ViewChild("startTime") startTimeInput: MatInput;
  @ViewChild("endDay") endDayInput: MatInput;
  @ViewChild("endTime") endTimeInput: MatInput;

  public eventForm: FormGroup;
  public allday: boolean;
  public timeFormat: string = "HH:mm";

  get label() { return this.eventForm.get('label'); }
  get startDay() { return this.eventForm.get('startDay'); }
  get startTime() { return this.eventForm.get('startTime'); }
  get endDay() { return this.eventForm.get('endDay'); }
  get endTime() { return this.eventForm.get('endTime'); }

  constructor(private formBuilder: FormBuilder,
    private eventService: EventService,
    public df: DateFsnService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setAllday(this.event.allday);
      this.labelInput.focus();
    });
  }

  setAllday(value: boolean): void {
    this.allday = value;
    if (this.allday) {
      this.startTime.disable();
      this.endTime.disable();
    } else {
      this.startTime.enable();
      this.endDay.value ? this.endTime.enable() : this.endTime.disable();
    }
  }

  buildForm(): void {
    this.eventForm = this.formBuilder.group({
      label: [this.event.label, Validators.required],
      startDay: [this.event.start, Validators.required],
      startTime: [this.timeInputFormat(this.event.start), this.startTimeValidator()],
      endDay: [this.event.end],
      endTime: [this.timeInputFormat(this.event.end), this.endTimeValidator()],
      allday: [this.event.allday],
      comment: [this.event.comment],
    }, { validators: this.startEndValidator });
  }

  timeInputFormat(date: Date): string {
    return date ? this.df.format(date, this.timeFormat) : '';
  }

  startTimeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this.timeTestFormat(control.value) ? null : { 'invalidFormat': { value: control.value } };
    };
  }

  endTimeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this.timeTestFormat(control.value) ? null : { 'invalidFormat': { value: control.value } };
    };
  }

  timeTestFormat(time: string, required: boolean = true): boolean {
    return (time == "" && !required) || /(([0-1][0-9]|2[0-3]):[0-5][0-9])|24:00/gm.test(time);
  }

  startEndValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    let startDay = control.get('startDay');
    let endDay = control.get('endDay');
    let startTime = control.get('startTime');
    let endTime = control.get('endTime');
    if (!endTime.getError('invalidFormat')) endTime.setErrors(null);
    if (this.dateCompareFormat(startDay.value) != this.dateCompareFormat(endDay.value)) return null;
    if (endTime.value < startTime.value) endTime.setErrors({ 'invalidEndTime': { value: control.value } });
    return null;
  };

  dateCompareFormat(day: string): string {
    return this.df.format(new Date(day), 'yyyyMMdd');
  }

  initEndDate(): void {
    if (!this.endDay.value) this.endDay.setValue(this.startDay.value);
    if (!this.endTime.value) this.endTime.setValue(this.startTime.value);
    this.endTime.enable();
    this.endTimeInput.focus();
  }

  toggleAllday(event) {
    this.setAllday(event.checked);
    if (!this.allday) this.startTimeInput.focus();
  }

  onSubmitForm() {
    let values = this.eventForm.value;
    this.event.label = values['label'];
    this.event.start = this.applyTime(values['startDay'], values['startTime']);
    this.event.end = this.applyTime(values['endDay'], values['endTime']);
    this.event.allday = this.allday;
    this.event.comment = values['comment'];
    this.eventService.saveEvent(this.event);
    this.onSubmit.next('submit');
  }

  applyTime(day: Date, time: string) {
    if (!time) return day;
    let times = time.split(':');
    day.setHours(Number(times[0]));
    day.setMinutes(Number(times[1]));
    return day;
  }

  public submit(): boolean {
    if (this.form.invalid) return false;
    this.form.ngSubmit.emit();
    return true;
  }
}
