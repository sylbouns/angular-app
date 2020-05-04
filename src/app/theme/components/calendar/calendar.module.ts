import { NgModule } from '@angular/core';
import { SharedThemeModule } from '@app/theme/shared-theme.module';

import { CalendarComponent } from './calendar.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { CalendarWeekDayComponent } from './calendar-week/calendar-week-day/calendar-week-day.component';
import { CalendarEventComponent } from './calendar-event/calendar-event.component';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';
import { CalendarYearComponent } from './calendar-year/calendar-year.component';

@NgModule({
  declarations: [CalendarComponent, CalendarMonthComponent, CalendarWeekDayComponent, CalendarEventComponent, CalendarWeekComponent, CalendarYearComponent],
  imports: [
    SharedThemeModule,
  ],
  exports: [
    CalendarComponent,
  ]
})
export class CalendarModule { }
