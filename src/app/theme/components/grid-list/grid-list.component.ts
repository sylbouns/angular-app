import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit {
  @Input() cols: number = 2;
  @Input() rowHeight: string = '200px';
  public gutterSize: string = '24px';

  constructor() { }

  ngOnInit(): void {
  }

}
