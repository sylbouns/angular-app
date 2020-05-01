import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { EventOutletComponent } from './event-outlet/event-outlet.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';

const routes: Routes = [
  { path: '',
    component: EventOutletComponent, 
    children: [
        { path: '', redirectTo: 'calendar', pathMatch: 'full' },
        { path: 'calendar', component: EventCalendarComponent },
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class EventRoutingModule {}
