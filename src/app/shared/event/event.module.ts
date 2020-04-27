import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from './event-form/event-form.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { EventViewComponent } from './event-view/event-view.component';
import { ThemeModule } from '@app/theme/theme.module';

@NgModule({
  declarations: [EventFormComponent, EventDialogComponent, EventViewComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ]
})
export class EventModule { }
