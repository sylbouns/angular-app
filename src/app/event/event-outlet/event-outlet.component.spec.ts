import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOutletComponent } from './event-outlet.component';

describe('EventOutletComponent', () => {
  let component: EventOutletComponent;
  let fixture: ComponentFixture<EventOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
