import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent implements OnInit {
  @Input() route;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
