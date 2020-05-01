import { NgModule } from '@angular/core';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { EventViewComponent } from './event-view/event-view.component';
import { ThemeModule } from '@app/theme/theme.module';
import { EventOutletComponent } from './event-outlet/event-outlet.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { EventRoutingModule } from './event.routes';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [EventFormComponent, EventDialogComponent, EventViewComponent, EventOutletComponent, EventCalendarComponent],
  imports: [
    ThemeModule,
    SharedModule,
    EventRoutingModule,
  ]
})
export class EventModule { }
