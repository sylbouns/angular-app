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

  log(data) { console.log(data) 
  }
  public date: Date;
  public nav: CalendarNav;
  public editor: CalendarEditor;
  public title: string;

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
    this.setTitle();
    this.initEditor();
  }

  initEditor(): void {
    this.editor = new CalendarEditor();
    this.editor.eventChanged.subscribe(event =>  this.events = this.editor.getEditedEvents(event, this.events));
    this.editor.eventFixed.subscribe(event => this.onEventEdit.emit(event));
  }

  onCalendarMouseleave(): void { this.editor.stop(); }

  setTitle() {
    switch (this.view) {
      case 'month': this.title = this.df.format(this.date, 'MMMM y'); break;
      case 'week': this.title = this.getWeekCalendarTitle(); break;
    }
  }

  getWeekCalendarTitle(): string {
    let start = this.df.startOfWeek(this.date);
    let end = this.df.endOfWeek(this.date);
    let title = this.df.format(start, 'MMMM');
    if (!this.df.isSameMonth(start, end)) title+= this.df.format(end, '- MMMM');
    title+= this.df.format(end, ' yyyy');
    title+= ' (semaine ' + this.df.format(this.date, 'w') + ')';
    return title;
  }

  weekendChange($event: MatSlideToggleChange) {
    this.weekend = $event.checked;
  }
}
