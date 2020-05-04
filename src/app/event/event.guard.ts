import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let view = route.paramMap.get('view');
    let year = route.paramMap.get('year');
    let month = route.paramMap.get('month');
    let day = route.paramMap.get('day');
console.log('canActivate');
    if (view == 'day') return false;
    if (Number(month) < 5) return false;

    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.canActivate(route, state);
  }
}