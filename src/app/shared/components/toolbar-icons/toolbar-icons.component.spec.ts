import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarIconsComponent } from './toolbar-icons.component';

describe('ToolbarIconsComponent', () => {
  let component: ToolbarIconsComponent;
  let fixture: ComponentFixture<ToolbarIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
