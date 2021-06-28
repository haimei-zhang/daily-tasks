import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementsEditorComponent } from './agreements-editor.component';

describe('AgreementsEditorComponent', () => {
  let component: AgreementsEditorComponent;
  let fixture: ComponentFixture<AgreementsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
