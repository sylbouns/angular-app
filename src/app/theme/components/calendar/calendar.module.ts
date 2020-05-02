import { NgModule } from '@angular/core';
import { SharedThemeModule } from '@app/theme/shared-theme.module';

import { CalendarComponent } from './calendar.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { CalendarMonthDayComponent } from './calendar-month/calendar-month-day/calendar-month-day.component';
import { CalendarMonthEventComponent } from './calendar-month/calendar-month-event/calendar-month-event.component';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';

@NgModule({
  declarations: [CalendarComponent, CalendarMonthComponent, CalendarMonthDayComponent, CalendarMonthEventComponent, CalendarWeekComponent],
  imports: [
    SharedThemeModule,
  ],
  exports: [
    CalendarComponent,
  ]
})
export class CalendarModule { }
