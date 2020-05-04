import { NgModule } from '@angular/core';
import { SharedThemeModule } from '@app/theme/shared-theme.module';

import { CalendarComponent } from './calendar.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { CalendarWeekDayComponent } from './calendar-week/calendar-week-day/calendar-week-day.component';
import { CalendarEventComponent } from './calendar-event/calendar-event.component';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';

@NgModule({
  declarations: [CalendarComponent, CalendarMonthComponent, CalendarWeekDayComponent, CalendarEventComponent, CalendarWeekComponent],
  imports: [
    SharedThemeModule,
  ],
  exports: [
    CalendarComponent,
  ]
})
export class CalendarModule { }
