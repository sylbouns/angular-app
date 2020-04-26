import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMonthEventComponent } from './calendar-month-event.component';

describe('CalendarMonthEventComponent', () => {
  let component: CalendarMonthEventComponent;
  let fixture: ComponentFixture<CalendarMonthEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarMonthEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMonthEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
