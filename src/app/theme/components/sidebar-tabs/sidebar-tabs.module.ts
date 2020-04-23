import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/theme/material.module';

import { SidebarTabsComponent } from './sidebar-tabs.component';
import { SidebarTabsPaneComponent } from './sidebar-tabs-pane/sidebar-tabs-pane.component';
import { SidebarTabsLabelComponent } from './sidebar-tabs-label/sidebar-tabs-label.component';

@NgModule({
  declarations: [
    SidebarTabsComponent,
    SidebarTabsLabelComponent,
    SidebarTabsPaneComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    SidebarTabsComponent,
    SidebarTabsPaneComponent,
  ]
})
export class SidebarTabsModule { }
