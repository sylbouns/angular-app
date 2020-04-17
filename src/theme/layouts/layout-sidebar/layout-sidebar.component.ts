import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrls: ['./layout-sidebar.component.scss']
})
export class LayoutSidebarComponent implements OnInit {
  company = 'Company name';
  title = 'Domain name';

  constructor() { }

  ngOnInit(): void {
  }

}
