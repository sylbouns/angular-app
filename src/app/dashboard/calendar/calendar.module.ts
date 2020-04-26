import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarYearComponent } from './calendar-year/calendar-year.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { ThemeModule } from '@app/theme/theme.module';
import { CalendarEventComponent } from './calendar-event/calendar-event.component';
import { CalendarMonthDayComponent } from './calendar-month/calendar-month-day/calendar-month-day.component';
import { CalendarMonthEventComponent } from './calendar-month/calendar-month-event/calendar-month-event.component';
import { CalendarMonthWeekComponent } from './calendar-month/calendar-month-week/calendar-month-week.component';

@NgModule({
  declarations: [CalendarComponent, CalendarYearComponent, CalendarMonthComponent, CalendarDayComponent, CalendarEventComponent, CalendarMonthDayComponent, CalendarMonthEventComponent, CalendarMonthWeekComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
  exports: [
    CalendarComponent,
  ]
})
export class CalendarModule { }
