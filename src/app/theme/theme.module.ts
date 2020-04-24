import { NgModule } from '@angular/core';

import { LayoutSidebarModule } from './layouts/layout-sidebar/layout-sidebar.module';
import { SharedThemeModule } from './shared-theme.module';

const BASE_MODULES = [
  SharedThemeModule,
  LayoutSidebarModule,
];

@NgModule({
  declarations: [ ],
  imports: [
    ...BASE_MODULES,
  ],
  exports: [
    ...BASE_MODULES,
  ],
})
export class ThemeModule { }
