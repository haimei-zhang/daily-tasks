import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHabitsComponent } from './create-habits.component';

describe('CreateHabitsComponent', () => {
  let component: CreateHabitsComponent;
  let fixture: ComponentFixture<CreateHabitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHabitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
