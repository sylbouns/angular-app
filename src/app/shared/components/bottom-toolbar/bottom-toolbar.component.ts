import { Component, OnInit, Input } from '@angular/core';
import { LayoutSidebarComponent } from '@app/theme/layouts/layout-sidebar/layout-sidebar.component';

@Component({
  selector: 'shared-bottom-toolbar',
  templateUrl: './bottom-toolbar.component.html',
  styleUrls: ['./bottom-toolbar.component.scss']
})
export class BottomToolbarComponent implements OnInit {
  @Input() layout: LayoutSidebarComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
