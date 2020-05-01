import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DASHBOARD_BASE_PATH, ONBOARDING_BASE_PATH, POST_BASE_PATH, EVENT_BASE_PATH } from './app.globals';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: DASHBOARD_BASE_PATH, loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: EVENT_BASE_PATH, loadChildren: () => import('./event/event.module').then(m => m.EventModule) },
  { path: POST_BASE_PATH, loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
  { path: ONBOARDING_BASE_PATH, loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
