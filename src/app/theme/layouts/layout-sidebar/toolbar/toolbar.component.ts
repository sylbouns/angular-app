import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;
  @Output() sidenavToggle = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
