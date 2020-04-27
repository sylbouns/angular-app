import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../event/event.model';
import { DateFsnService } from '@app/theme/services/date-fsn.service';

@Component({
  selector: 'calendar-month-event',
  templateUrl: './calendar-month-event.component.html',
  styleUrls: ['./calendar-month-event.component.scss']
})
export class CalendarMonthEventComponent implements OnInit {
  @Input() event: Event;

  constructor(public df: DateFsnService) { }

  ngOnInit(): void {
    // let length = this.max - this.min;
    // let start = Math.max(this.df.getTime(this.event.start), this.min);
    // let end = Math.min(this.df.getTime(this.event.end), this.max);
    // if (start == end) end += 86400000;
    // this.left = (start - this.min) / length * 100;
    // this.width = (end - start) / length * 100;
  }

}
