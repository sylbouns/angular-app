import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ThemeModule } from '../theme/theme.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { CalendarModule } from './calendar/calendar.module';

@NgModule({
  declarations: [DashboardComponent, LayoutComponent],
  imports: [
    ThemeModule,
    SharedModule,
    DashboardRoutingModule,
    CalendarModule,
  ]
})
export class DashboardModule { }
