import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateHabitsComponent } from './create-update-habits.component';

describe('CreateHabitsComponent', () => {
  let component: CreateUpdateHabitsComponent;
  let fixture: ComponentFixture<CreateUpdateHabitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateHabitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
