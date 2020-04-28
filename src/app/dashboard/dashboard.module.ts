import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ThemeModule } from '../theme/theme.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { EventModule } from '@app/shared/event/event.module';

@NgModule({
  declarations: [DashboardComponent, LayoutComponent],
  imports: [
    ThemeModule,
    SharedModule,
    DashboardRoutingModule,
    EventModule,
  ]
})
export class DashboardModule { }
