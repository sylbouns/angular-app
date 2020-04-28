import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Input() title: string;
  @Input() data: any;
  @Input() dialogActions: TemplateRef<any>;
  public actions: boolean = true;

  constructor( ) {}
}
