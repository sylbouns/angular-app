import { DateFsnService } from '@app/theme/services/date-fsn.service';

export const df = new DateFsnService();

export class CalendarNav {
  public basePath: string[];
  public paramsPath: string[];
  public view: string;
  public date: Date;
  // Router Links
  public today: string[];
  public previous: string[];
  public next: string[];
  public year: string[];
  public month: string[];
  public week: string[];
  public day: string[];
  // Allowed views
  private views = ['year', 'month', 'day', 'week'];

  constructor() { }

  init(url: string, path: string, view: string, year: string, month: string, day: string): boolean {
    this.initBasePath(url, path);
    if (!this.initView(view)) return false;
    if (!this.initDate(year, month, day)) return false;
    this.initTodayNav();
    this.initNextPreviousNav();
    this.initViewsNav();
    return true;
  }

  private initBasePath(url: string, path: string) {
    this.paramsPath = path.split('/');
    this.basePath = url.split('/');
    this.basePath.splice(this.basePath.length - this.paramsPath.length, this.paramsPath.length);
    return true;
  }

  private initView(view: string): boolean {
    return this.views.includes(this.view = view);
  }

  private initDate(year: string, month: string, day: string): boolean {
    this.date = new Date(Number(year), Number(month) - 1, Number(day));
    return this.isDateValid(this.date);
  }

  private initTodayNav(): void {
    this.today = this.getDateRouterLink(new Date());
  }

  private initNextPreviousNav(): void {
    switch (this.view) {
      case 'year':
        this.previous = this.getDateRouterLink(df.subYears(this.date, 1));
        this.next = this.getDateRouterLink(df.addYears(this.date, 1));
        break;
      case 'month':
        this.previous = this.getDateRouterLink(df.subMonths(this.date, 1));
        this.next = this.getDateRouterLink(df.addMonths(this.date, 1));
        break;
      case 'day':
        this.previous = this.getDateRouterLink(df.subDays(this.date, 1));
        this.next = this.getDateRouterLink(df.addDays(this.date, 1));
        break;
      case 'week':
        this.previous = this.getDateRouterLink(df.subWeeks(this.date, 1));
        this.next = this.getDateRouterLink(df.addWeeks(this.date, 1));
        break;
    }
  }

  private initViewsNav(): void {
    this.views.map(view => this[view] = this.getViewRouterLink(view));
  }

  public getDateRouterLink(date: Date): string[] {
    return this.getRouterLink(this.view, date);
  }

  public getViewRouterLink(view: string): string[] {
    return this.getRouterLink(view, this.date);
  }
  
  public getRouterLink(view: string, date: Date): string[] {
    let route = [ ...this.basePath ];
    this.paramsPath.forEach(key => route.push(this.getParamValue(key, date, view)));
    return route;
  }

  private getParamValue(key: string, date: Date, view: string): string {
    switch (key) {
      case ':view': return view;
      case ':year': return df.format(date, 'yyyy');
      case ':month': return df.format(date, 'MM');
      case ':day': return df.format(date, 'dd');
      default: return key;
    }
  }

  private isDateValid(date: Date): boolean {
    return date instanceof Date && !isNaN(date.valueOf());
  }
}
