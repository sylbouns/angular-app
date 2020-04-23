import { NgModule } from '@angular/core';
import { ThemeModule } from '../theme/theme.module';
import { AppSwitchComponent } from './components/app-switch/app-switch.component';
import { AbsPipe } from './pipes/abs.pipe';

@NgModule({
  declarations: [
    AppSwitchComponent,
    AbsPipe,
  ],
  imports: [
    ThemeModule,
  ],
  exports: [
    ThemeModule,
    AppSwitchComponent,
    AbsPipe,
  ]
})
export class SharedModule { }
