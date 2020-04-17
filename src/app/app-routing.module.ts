import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DASHBOARD_BASE_PATH, ONBOARDING_BASE_PATH, POST_BASE_PATH } from './app.globals';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: DASHBOARD_BASE_PATH, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: ONBOARDING_BASE_PATH, loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule) },
  { path: POST_BASE_PATH, loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
