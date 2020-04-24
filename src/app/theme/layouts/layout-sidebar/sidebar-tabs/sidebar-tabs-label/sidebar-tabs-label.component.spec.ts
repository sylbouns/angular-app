import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTabsLabelComponent } from './sidebar-tabs-label.component';

describe('SidebarTabsLabelComponent', () => {
  let component: SidebarTabsLabelComponent;
  let fixture: ComponentFixture<SidebarTabsLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTabsLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTabsLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
