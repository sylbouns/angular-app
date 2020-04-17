import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

import { LayoutPublicComponent } from './layouts/layout-public/layout-public.component';
import { LayoutSidebarComponent } from './layouts/layout-sidebar/layout-sidebar.component';

@NgModule({
  declarations: [
    LayoutPublicComponent,
    LayoutSidebarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    LayoutPublicComponent,
    LayoutSidebarComponent,
  ],
})
export class ThemeModule { }
