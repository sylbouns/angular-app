import { Injectable } from '@angular/core';
import { format, addYears, subYears, addMilliseconds, startOfYear, endOfYear, startOfDay, endOfDay, isToday, getTime, differenceInCalendarDays, addDays, subDays, max, min, isSameWeek, addWeeks, subWeeks, isSameMonth, getWeekOfMonth, areIntervalsOverlapping, getOverlappingDaysInIntervals, differenceInDays, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth } from 'date-fns';
import { fr } from 'date-fns/esm/locale'

@Injectable({
  providedIn: 'root'
})
export class DateFsnService {

  private weekStartsOn = 1;
  private locale = fr;

  constructor() { }

  addMilliseconds(date: number | Date, amount: number): Date {
    return addMilliseconds(date, amount);
  }

  startOfYear(date: number | Date): Date {
    return startOfYear(date);
  }

  endOfYear(date: number | Date): Date {
    return endOfYear(date);
  }
  
  startOfDay(date: number | Date): Date {
    return startOfDay(date);
  }

  endOfDay(date: number | Date): Date {
    return endOfDay(date);
  }

  startOfWeek(date, options?): Date {
    return startOfWeek(date, { weekStartsOn: this.weekStartsOn, ...options });
  }

  endOfWeek(date, options?): Date {
    return endOfWeek(date, { weekStartsOn: this.weekStartsOn, ...options });
  }

  startOfMonth(date): Date {
    return startOfMonth(date);
  }

  endOfMonth(date): Date {
    return endOfMonth(date);
  }

  eachDayOfInterval(interval, options?): Date[] {
    return eachDayOfInterval(interval, options);
  }

  isSameDay(dateLeft: number | Date, dateRight: number | Date): boolean {
    return isSameDay(dateLeft, dateRight);
  }
  
  isAfter(date: number | Date, dateToCompare: number | Date): boolean {
    return isAfter(date, dateToCompare);
  }
  
  isBefore(date: number | Date, dateToCompare: number | Date): boolean {
    return isBefore(date, dateToCompare);
  }

  getTime(date): number {
    return getTime(date);
  }

  isToday(date): boolean {
    return isToday(date);
  }

  format(date, f: string, options?): string {
    return format(date, f, { 
      locale: this.locale, 
      weekStartsOn: this.weekStartsOn, 
      ...options 
    });
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
    return areIntervalsOverlapping(intervalLeft, intervalRight, { inclusive: true, ...options });
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

  addMonths(date, amount): Date {
    return addMonths(date, amount);
  }

  subMonths(date, amount): Date {
    return subMonths(date, amount);
  }

  addWeeks(date, amount): Date {
    return addWeeks(date, amount);
  }

  subWeeks(date, amount): Date {
    return subWeeks(date, amount);
  }

  addYears(date, amount): Date {
    return addYears(date, amount);
  }

  subYears(date, amount): Date {
    return subYears(date, amount);
  }

  isSameMonth(dateLeft, dateRight): boolean {
    return isSameMonth(dateLeft, dateRight);
  }

  isSameWeek(dateLeft, dateRight, options?): boolean {
    return isSameWeek(dateLeft, dateRight, { weekStartsOn: this.weekStartsOn, ...options });
  }

  isWeekend(date): boolean {
    return isWeekend(date);
  }

  isFirstDayOfMonth(date): boolean {
    return isFirstDayOfMonth(date);
  }

  getWeekOfMonth(date, options?): number {
    return getWeekOfMonth(date, { weekStartsOn: this.weekStartsOn, ...options });
  }

}
