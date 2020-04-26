import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '*',
      })),
      state('closed', style({
        width: '0px',
      })),
      transition('open => closed', [
        animate('0.3s 0s ease-in-out')
      ]),
      transition('closed => open', [
        animate('0.3s 0s ease-in-out')
      ]),
    ]),
  ]
})
export class SearchComponent implements OnInit {

  private proposals: string[] = [
    'Autocomplete search',
    'Second exemple',
    'Another prediction',
  ]
  public filtredProposals: Observable<string[]>;
  public searchControl: FormControl = new FormControl();
  public isOpen: boolean = false;

  @ViewChild("searchInput") searchInput: ElementRef<any>;

  constructor() {
    this.filtredProposals = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(search => search ? this._filtredProposals(search) : this.proposals.slice())
    );
  }

  private _filtredProposals(search: string): string[] {
    const filterValue = search.toLowerCase();

    return this.proposals.filter(state => state.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
  }

  public toggleSearchInput() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.searchInput.nativeElement.focus();
  }
}
