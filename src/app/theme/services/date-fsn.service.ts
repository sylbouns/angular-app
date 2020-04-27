import { Injectable } from '@angular/core';
import { format, isToday, getTime, differenceInCalendarDays, addDays, subDays, max, min, isSameWeek, addWeeks, subWeeks, isSameMonth, getWeekOfMonth, areIntervalsOverlapping, getOverlappingDaysInIntervals, differenceInDays, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth } from 'date-fns';
import { fr } from 'date-fns/esm/locale'

@Injectable({
  providedIn: 'root'
})
export class DateFsnService {

  constructor() { }
  
  getTime(date): number {
    return getTime(date);
  }

  isToday(date): boolean {
    return isToday(date);
  }

  format(date, f: string): string {
    return format(date, f, { locale: fr });
  }

  max(datesArray): Date {
    return max(datesArray);
  }

  min(datesArray): Date {
    return min(datesArray);
  }

  differenceInCalendarDays(dateLeft, dateRight) {
    return differenceInCalendarDays(dateLeft, dateRight);
  }

  areIntervalsOverlapping(intervalLeft, intervalRight, options?): boolean {
    return areIntervalsOverlapping(intervalLeft, intervalRight, options);
  }

  getOverlappingDaysInIntervals(intervalLeft, intervalRight): number {
    return getOverlappingDaysInIntervals(intervalLeft, intervalRight);
  }

  addDays(date, amount): Date {
    return addDays(date, amount);
  }

  subDays(date, amount): Date {
    return subDays(date, amount);
  }

  addWeeks(date, amount): Date {
    return addWeeks(date, amount);
  }

  subWeeks(date, amount): Date {
    return subWeeks(date, amount);
  }

  isSameMonth(dateLeft, dateRight): boolean {
    return isSameMonth(dateLeft, dateRight);
  }

  isSameWeek(dateLeft, dateRight): boolean {
    return isSameWeek(dateLeft, dateRight);
  }

  isWeekend(date): boolean {
    return isWeekend(date);
  }

  isFirstDayOfMonth(date): boolean {
    return isFirstDayOfMonth(date);
  }

  getWeekOfMonth(date, options?): number {
    return getWeekOfMonth(date, options);
  }

}
