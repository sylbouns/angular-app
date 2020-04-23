import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrls: ['./layout-sidebar.component.scss']
})
export class LayoutSidebarComponent implements OnInit {
  @Input() company: string = 'Company name';
  @Input() title: string = 'Domain name';

  public mode: string = 'side';
  public opened: boolean = false;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
    ]).subscribe(result => {
      if (result.matches) {
        this.mode = 'push';
        this.opened = false;
      }
    });
    breakpointObserver.observe([
      Breakpoints.Small,
    ]).subscribe(result => {
      if (result.matches) {
        this.mode = 'over';
        this.opened = false;
      }
    });
    breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        this.mode = 'side';
        this.opened = true;
      }
    });
  }

  ngOnInit(): void {
  }

}
