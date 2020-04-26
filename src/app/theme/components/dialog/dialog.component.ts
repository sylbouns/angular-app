import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() title: string;
  @Input() data: any;
  @ViewChild("dialogActions") dialogActionsRef: ElementRef<any>;
  public actions: boolean = true;

  constructor( ) {}

  ngAfterViewInit() {
    this.actions = !this.isEmpty(this.dialogActionsRef);
  }

  isEmpty(elt: ElementRef<any>) {
    return elt == undefined ? true : elt.nativeElement.childNodes.length == 0;
  }
}
