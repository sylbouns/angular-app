import { NgModule } from '@angular/core';
import { ThemeModule } from '../theme/theme.module';
import { AppSwitchComponent } from './components/app-switch/app-switch.component';
import { AbsPipe } from '../theme/pipes/abs.pipe';

@NgModule({
  declarations: [
    AppSwitchComponent,
  ],
  imports: [
    ThemeModule,
  ],
  exports: [
    ThemeModule,
    AppSwitchComponent,
  ]
})
export class SharedModule { }
