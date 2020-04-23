import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'sidebar-tabs-pane',
  templateUrl: './sidebar-tabs-pane.component.html',
  styleUrls: ['./sidebar-tabs-pane.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
      })),
      state('closed', style({
        height: '0px',
      })),
      transition('open => closed', [
        animate('0.3s 0s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.5s 0.3s ease-in-out')
      ]),
    ]),
  ]
})
export class SidebarTabsPaneComponent {
  @Input() id: string;
  @Input() route;
  @Input() icon: string;
  @Input() label: string;
  @Input() switch: Subject<string> = new Subject<string>();
  @Input() isOpen: boolean = false;

  constructor() { }

  onTabSwitch(id): void { this.id == id ? this.open() : this.close(); }
  open(): void { this.isOpen = true }
  close(): void { this.isOpen = false }
}
