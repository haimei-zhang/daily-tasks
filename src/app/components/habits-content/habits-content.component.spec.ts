import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitsContentComponent } from './habits-content.component';

describe('HabitsContentComponent', () => {
  let component: HabitsContentComponent;
  let fixture: ComponentFixture<HabitsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
