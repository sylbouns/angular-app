import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ThemeModule } from 'src/theme/theme.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [DashboardComponent, LayoutComponent],
  imports: [
    ThemeModule,
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
