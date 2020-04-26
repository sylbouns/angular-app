import { Injectable } from '@angular/core';
import { format, isSameMonth, areIntervalsOverlapping, differenceInDays, isSameDay, isAfter, isBefore, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, getMonth, isWeekend, addMonths, subMonths, isFirstDayOfMonth } from 'date-fns';
import { fr } from 'date-fns/esm/locale'

@Injectable({
  providedIn: 'root'
})
export class DateFsnService {

  constructor() { }

  format(date: Date, f: string): string {
    return format(date, f, { locale: fr });
  }

  isSameMonth(dateLeft: Date, dateRight: Date): boolean {
    return isSameMonth(dateLeft, dateRight);
  }

  isWeekend(date: Date): boolean {
    return isWeekend(date);
  }

  isFirstDayOfMonth(date: Date): boolean {
    return isFirstDayOfMonth(date);
  }

}
