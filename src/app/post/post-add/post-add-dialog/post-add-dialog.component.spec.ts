import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAddDialogComponent } from './post-add-dialog.component';

describe('PostAddDialogComponent', () => {
  let component: PostAddDialogComponent;
  let fixture: ComponentFixture<PostAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
