import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarMonthComponent } from './calendar-month/calendar-month.component';
import { ThemeModule } from '@app/theme/theme.module';
import { CalendarMonthDayComponent } from './calendar-month/calendar-month-day/calendar-month-day.component';
import { CalendarMonthEventComponent } from './calendar-month/calendar-month-event/calendar-month-event.component';
import { CalendarMonthWeekComponent } from './calendar-month/calendar-month-week/calendar-month-week.component';
import { EventModule } from '@app/shared/event/event.module';
import { SharedThemeModule } from '@app/theme/shared-theme.module';

@NgModule({
  declarations: [CalendarComponent, CalendarMonthComponent, CalendarMonthDayComponent, CalendarMonthEventComponent, CalendarMonthWeekComponent],
  imports: [
    SharedThemeModule,
  ],
  exports: [
    CalendarComponent,
  ]
})
export class CalendarModule { }
