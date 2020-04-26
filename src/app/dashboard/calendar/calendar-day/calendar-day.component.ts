import { Component, OnInit, Input } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() date: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    console.log(format(this.date, 'PPPP'));
  }

}
