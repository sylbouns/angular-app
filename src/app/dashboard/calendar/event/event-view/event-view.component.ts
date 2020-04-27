import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event.model';
import { DateFsnService } from '@app/theme/services/date-fsn.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  @Input() event: Event;

  constructor(public df: DateFsnService) { }

  ngOnInit(): void {
  }

}
