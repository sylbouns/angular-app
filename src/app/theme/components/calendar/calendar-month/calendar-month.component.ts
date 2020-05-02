import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DateFsnService } from '@app/theme/services/date-fsn.service';
import { CalendarEvent } from '../calendar-event';
import { CalendarMonthEditor } from './calendar-month.editor';

@Component({
  selector: 'calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit, OnChanges {
  @Input() events: CalendarEvent[] = [];
  @Input() filteredEvents: CalendarEvent[] = [];
  @Input() date: Date = new Date();
  @Input() weekend: boolean = true;
  @Output() onEventClick: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();
  @Output() onEventEdit: EventEmitter<CalendarEvent> = new EventEmitter<CalendarEvent>();

  public start: Date;
  public end: Date;
  public weeks: Date[] = [];

  // Event editor
  public editor: CalendarMonthEditor;

  constructor(public df: DateFsnService) { }

  ngOnInit(): void {
    this.setWeeks();
    this.initEditor();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.date) this.setWeeks();
    if (changes.events) this.setMonthFilteredEvents(changes.events.currentValue);
    if (changes.weekend) this.setMonthFilteredEvents(this.events);
  }

  setWeeks(): void {
    this.start = this.df.startOfWeek(this.df.startOfMonth(this.date));
    this.end = this.df.endOfWeek(this.df.endOfMonth(this.date));
    let date = this.date;
    this.weeks = [];
    while (!this.df.isSameWeek(date, this.start)) date = this.df.subWeeks(date, 1);
    while (!this.df.isSameWeek(date, this.df.addWeeks(this.end, 1))) {
      this.weeks.push(date);
      date = this.df.addWeeks(date, 1);
    }
  }

  setMonthFilteredEvents(events: CalendarEvent[]) {
    this.filteredEvents = events.filter(event => this.df.areIntervalsOverlapping(
      { start: this.start, end: this.end },
      { start: event.start, end: event.end ? event.end : event.start }
    ));
  }

  formatWeekDayName(day: number) {
    return this.df.format(this.df.addDays(this.start, day), 'iii');
  }

  setDate(date: Date): void {
    this.date = date;
    this.setWeeks();
  }

  weekendChange($event: MatSlideToggleChange) {
    this.weekend = $event.checked;
    this.setWeeks();
  }

  today(): void {
    this.setDate(new Date());
  }

  nextMonth(): void {
    this.setDate(this.df.addMonths(this.date, 1));
  }

  previousMonth(): void {
    this.setDate(this.df.subMonths(this.date, 1));
  }

  // EDITOR
  initEditor() {
    this.editor = new CalendarMonthEditor(this.df);
    this.editor.eventChanged.subscribe(event => this.updateEditorEvent(event));
    this.editor.eventFixed.subscribe(event => this.onEventEdit.emit(event));
  }

  updateEditorEvent(event: CalendarEvent) {
    let index = this.events.findIndex(e => e.id == event.id);
    if (index != -1) {
      this.events.splice(index, 1, event);
      this.events = [...this.events];
    } else this.events = [event, ...this.events]
  }

  onDayMousedown(date): void { this.editor.start(date); }
  onDayMouseenter(date): void { this.editor.update(date); }
  onDayMouseup(date): void { this.editor.stop(date); }
  onEventExpandMousedownStart(event: CalendarEvent): void { this.editor.startExpand(event, 'start'); }
  onEventExpandMousedownEnd(event: CalendarEvent): void { this.editor.startExpand(event, 'end'); }
  onMonthMouseleave(): void { this.editor.stop(); }

}
