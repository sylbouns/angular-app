import { NgModule } from '@angular/core';
import { ThemeModule } from 'src/theme/theme.module';
import { SharedModule } from '../shared/shared.module';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingComponent } from './onboarding.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    OnboardingComponent,
    LayoutComponent,
  ],
  imports: [
    OnboardingRoutingModule,
    ThemeModule,
    SharedModule,
  ]
})
export class OnboardingModule { }
