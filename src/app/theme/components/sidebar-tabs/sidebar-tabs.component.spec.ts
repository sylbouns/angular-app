import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTabsComponent } from './sidebar-tabs.component';

describe('SidebarTabsComponent', () => {
  let component: SidebarTabsComponent;
  let fixture: ComponentFixture<SidebarTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
