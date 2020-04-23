import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent implements OnInit {
  @Input() routerLink: [];
  @Input() text: string = 'Back';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
