import { NgModule } from '@angular/core';
import { SharedThemeModule } from '@app/theme/shared-theme.module';

import { SidebarTabsModule } from './sidebar-tabs/sidebar-tabs.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BottomToolbarComponent } from './bottom-toolbar/bottom-toolbar.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { SidebarToolbarComponent } from './sidebar-toolbar/sidebar-toolbar.component';
import { LayoutSidebarComponent } from './layout-sidebar.component';

@NgModule({
  declarations: [
    LayoutSidebarComponent,
    ToolbarComponent,
    BottomToolbarComponent,
    SidebarMenuComponent,
    SidebarToolbarComponent,
  ],
  imports: [
    SharedThemeModule,
  ],
  exports: [
    LayoutSidebarComponent,
    SidebarTabsModule,
    ToolbarComponent,
    BottomToolbarComponent,
    SidebarMenuComponent,
    SidebarToolbarComponent,
  ]
})
export class LayoutSidebarModule { }
