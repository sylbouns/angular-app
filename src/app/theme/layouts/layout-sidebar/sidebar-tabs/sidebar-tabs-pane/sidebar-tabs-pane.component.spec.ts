import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTabsPaneComponent } from './sidebar-tabs-pane.component';

describe('SidebarTabsPaneComponent', () => {
  let component: SidebarTabsPaneComponent;
  let fixture: ComponentFixture<SidebarTabsPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTabsPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTabsPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
