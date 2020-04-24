import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

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
  public media: { [key: string]: boolean } = {
    xsmall: false,
    small: false,
    medium: false,
    large: false,
    xlarge: false,
  }
  
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => result.matches ? this.updateView(result.breakpoints) : false);
  }

  updateView(breakpoints): void {
    this.media.xsmall = breakpoints[Breakpoints.XSmall];
    this.media.small = breakpoints[Breakpoints.Small];
    this.media.medium = breakpoints[Breakpoints.Medium];
    this.media.large = breakpoints[Breakpoints.Large];
    this.media.xlarge = breakpoints[Breakpoints.XLarge];

    this.updateMode();
    this.updateOpened();
  }

  updateMode(): void {
    switch (true) {
      case this.media.xsmall: this.mode = 'push'; break;
      case this.media.small: this.mode = 'over'; break;
      default: this.mode = 'side';
    }
  }

  updateOpened(): void {
    switch (true) {
      case this.media.xsmall: this.opened = false; break;
      case this.media.small: this.opened = false; break;
      default: this.opened = true;
    }
  }

  ngOnInit(): void {
  }

}
