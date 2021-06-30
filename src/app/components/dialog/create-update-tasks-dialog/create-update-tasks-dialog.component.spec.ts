import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateTasksDialogComponent } from './create-update-tasks-dialog.component';

describe('CreateUpdateTasksDialogComponent', () => {
  let component: CreateUpdateTasksDialogComponent;
  let fixture: ComponentFixture<CreateUpdateTasksDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateTasksDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateTasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
