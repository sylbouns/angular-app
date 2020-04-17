import { NgModule } from '@angular/core';
import { ThemeModule } from 'src/theme/theme.module';
import { AppSwitchComponent } from './components/app-switch/app-switch.component';

@NgModule({
  declarations: [
    AppSwitchComponent,
  ],
  imports: [
    ThemeModule,
  ],
  exports: [
    AppSwitchComponent,
  ]
})
export class SharedModule { }
