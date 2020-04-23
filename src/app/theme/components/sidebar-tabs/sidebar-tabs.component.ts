import { Component, OnInit, QueryList, ContentChildren, ViewChildren, Output, Input, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SidebarTabsPaneComponent } from './sidebar-tabs-pane/sidebar-tabs-pane.component';

@Component({
  selector: 'sidebar-tabs',
  templateUrl: './sidebar-tabs.component.html',
  styleUrls: ['./sidebar-tabs.component.scss']
})
export class SidebarTabsComponent implements OnInit, AfterViewInit {
  @ContentChildren(SidebarTabsPaneComponent) panes!: QueryList<SidebarTabsPaneComponent>;
  @Input() openId: string = null;
  public switchTab: Subject<string> = new Subject<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.panes.forEach((pane, index) => {
      pane.switch = this.switchTab;
      pane.switch.subscribe(event => pane.onTabSwitch(event))
    });
  }

  open(id: string) {
    this.openId == id ? this.openId = null : this.openId = id;
    this.switchTab.next(this.openId);
  }

}
