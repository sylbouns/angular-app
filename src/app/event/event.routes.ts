import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventOutletComponent } from './event-outlet/event-outlet.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { CalendarNavResolver } from '@app/theme/components/calendar/calendar-nav.resolver';
import { EventGuard } from './event.guard';

const routes: Routes = [
  {
    path: '',
    component: EventOutletComponent, 
    children: [
      { path: '', redirectTo: 'calendar', pathMatch: 'full' },
      { path: 'calendar', canActivateChild: [EventGuard], children: [
          { path: '', redirectTo: 'month/2020/05/03', pathMatch: 'full' },
          { path: ':view/:year/:month/:day', component: EventCalendarComponent, resolve: { calendarNav: CalendarNavResolver } },
      ]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule { }
