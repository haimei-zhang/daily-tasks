import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBankDialogComponent } from './create-update-bank-dialog.component';

describe('CreateUpdateBankDialogComponent', () => {
  let component: CreateUpdateBankDialogComponent;
  let fixture: ComponentFixture<CreateUpdateBankDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateBankDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateBankDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
