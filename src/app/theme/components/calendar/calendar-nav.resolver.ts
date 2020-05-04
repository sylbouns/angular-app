import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { CalendarNav } from './calendar-nav';

@Injectable({
  providedIn: 'root',
})
export class CalendarNavResolver implements Resolve<CalendarNav> {

  constructor() { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CalendarNav {

    let nav = new CalendarNav();
    let view = route.paramMap.get('view');
    let year = route.paramMap.get('year');
    let month = route.paramMap.get('month');
    let day = route.paramMap.get('day');

    return nav.init(state.url, route.routeConfig.path, view, year, month, day) ? nav : undefined;
  }
}