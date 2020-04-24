import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { LayoutPublicComponent } from './layouts/layout-public/layout-public.component';
import { LayoutSidebarComponent } from './layouts/layout-sidebar/layout-sidebar.component';
import { PageOutletComponent } from './components/page-outlet/page-outlet.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { GridComponent } from './components/grid/grid.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { GridTileComponent } from './components/grid-tile/grid-tile.component';
import { FlexGridComponent } from './components/flex-grid/flex-grid.component';
import { FlexGridDirective } from './components/flex-grid/flex-cell.directive';
import { BackLinkComponent } from './components/back-link/back-link.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { TabItemComponent } from './components/tab-item/tab-item.component';
import { SidebarTabsModule } from './components/sidebar-tabs/sidebar-tabs.module';
import { SectionLayoutComponent } from './components/section-layout/section-layout.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ActionsComponent } from './components/actions/actions.component';
import { FullscreenComponent } from './components/fullscreen/fullscreen.component';

const BASE_MODULES = [
  MaterialModule,
  SidebarTabsModule,
];

const BASE_COMPONENTS = [
  LayoutPublicComponent,
  LayoutSidebarComponent,
  PageOutletComponent,
  PageTitleComponent,
  GridComponent,
  GridListComponent,
  GridTileComponent,
  FlexGridComponent,
  BackLinkComponent,
  MenuItemComponent,
  SidebarMenuComponent,
  TabItemComponent,
  SectionLayoutComponent,
  DialogComponent,
  ActionsComponent,
  FullscreenComponent,
];

const BASE_DIRECTIVES = [
  FlexGridDirective,
];

const BASE_PIPES = [];

@NgModule({
  declarations: [
    ...BASE_PIPES,
    ...BASE_DIRECTIVES,
    ...BASE_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...BASE_MODULES,
  ],
  exports: [
    ...BASE_MODULES,
    ...BASE_PIPES,
    ...BASE_DIRECTIVES,
    ...BASE_COMPONENTS,
  ],
  entryComponents: [
    DialogComponent,
  ],
})
export class ThemeModule { }
