import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {
  @Output() click = new EventEmitter<string>();

  constructor() { }
  
}
