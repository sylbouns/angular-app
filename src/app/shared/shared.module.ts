import { NgModule } from '@angular/core';
import { ThemeModule } from '../theme/theme.module';
import { AppSwitchComponent } from './components/app-switch/app-switch.component';
import { SidebarToolbarComponent } from './components/sidebar-toolbar/sidebar-toolbar.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SidebarTabsComponent } from './components/sidebar-tabs/sidebar-tabs.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ToolbarIconsComponent } from './components/toolbar-icons/toolbar-icons.component';
import { BottomToolbarComponent } from './components/bottom-toolbar/bottom-toolbar.component';

@NgModule({
  declarations: [
    AppSwitchComponent,
    SidebarToolbarComponent,
    SidebarMenuComponent,
    SidebarTabsComponent,
    SettingsComponent,
    ToolbarIconsComponent,
    BottomToolbarComponent,
  ],
  imports: [
    ThemeModule,
  ],
  exports: [
    ThemeModule,
    AppSwitchComponent,
    SidebarToolbarComponent,
    SidebarMenuComponent,
    SidebarTabsComponent,
    SettingsComponent,
    ToolbarIconsComponent,
    BottomToolbarComponent,
  ]
})
export class SharedModule { }
