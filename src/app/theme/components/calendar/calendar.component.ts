import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarEvent } from './calendar-event';
import { CalendarEditor } from './calendar-editor';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarNav } from './calendar-nav';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];
  @Input() weekend: boolean = true;
  @Input() view: string = 'month';
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();
  @Output() onEventEdit: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  public date: Date;
  public nav: CalendarNav;
  public editor: CalendarEditor;
  public titleDay: string;
  public titleWeek: string;
  public titleMonth: string;
  public titleYear: string;

  constructor(
    public df: DateFsnService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => data.calendarNav ? this.initCalendar(data.calendarNav) : false);
  }

  initCalendar(nav: CalendarNav): void {
    this.nav = nav;
    this.date = nav.date;
    this.view = nav.view;
    this.setTitles();
    this.initEditor();
  }

  initEditor(): void {
    this.editor = new CalendarEditor();
    this.editor.eventChanged.subscribe(event =>  this.events = this.editor.getEditedEvents(event, this.events));
    this.editor.eventFixed.subscribe(event => this.onEventEdit.emit(event));
    this.editor.eventClicked.subscribe(event => this.onEventClick.emit(event));
  }

  onCalendarMouseleave(): void { this.editor.stop(); }

  setTitles() {
    this.titleDay = this.df.format(this.date, 'EEEE d');
    this.titleWeek = 'semaine ' + this.df.format(this.date, 'w');
    this.titleMonth = this.df.format(this.date, 'MMMM');
    this.titleYear = this.df.format(this.date, 'y');
  }

  weekendChange($event: MatSlideToggleChange) {
    this.weekend = $event.checked;
  }
}
