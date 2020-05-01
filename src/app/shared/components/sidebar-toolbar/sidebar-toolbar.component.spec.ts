import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarToolbarComponent } from './sidebar-toolbar.component';

describe('SidebarToolbarComponent', () => {
  let component: SidebarToolbarComponent;
  let fixture: ComponentFixture<SidebarToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
