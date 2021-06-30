import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateHabitsDialogComponent } from './create-update-habits-dialog.component';

describe('CreateHabitsComponent', () => {
  let component: CreateUpdateHabitsDialogComponent;
  let fixture: ComponentFixture<CreateUpdateHabitsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateHabitsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateHabitsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
