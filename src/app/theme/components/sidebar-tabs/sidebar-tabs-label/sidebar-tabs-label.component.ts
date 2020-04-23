import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'sidebar-tabs-label',
  templateUrl: './sidebar-tabs-label.component.html',
  styleUrls: ['./sidebar-tabs-label.component.scss']
})
export class SidebarTabsLabelComponent implements OnInit {
  @Input() id!: string;
  @Input() route;
  @Input() icon: string;
  @Input() label: string;
  @Input() active: boolean = false;
  
  @Input() switch: Subject<string> = new Subject<string>();
  @Output() open = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.switch.subscribe(event => this.onTabSwitch(event));
  }

  onLabelClick(): void {
    if (this.route) return;
    this.open.emit(this.id);
  }

  onTabSwitch(id): void {
    if (this.route) return;
    this.id == id ? this.toggle() : this.setDefault();
  }

  toggle(): void { this.active ? this.setDefault() : this.setActive(); }
  setActive(): void { this.active = true; }
  setDefault(): void { this.active = false; }
}
