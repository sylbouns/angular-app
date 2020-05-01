import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { LayoutSidebarComponent } from '@app/theme/layouts/layout-sidebar/layout-sidebar.component';

@Component({
  selector: 'shared-toolbar-icons',
  templateUrl: './toolbar-icons.component.html',
  styleUrls: ['./toolbar-icons.component.scss']
})
export class ToolbarIconsComponent implements OnInit {
  @Input() layout: LayoutSidebarComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
