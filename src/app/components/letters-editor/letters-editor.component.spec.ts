import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersEditorComponent } from './letters-editor.component';

describe('LettersEditorComponent', () => {
  let component: LettersEditorComponent;
  let fixture: ComponentFixture<LettersEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LettersEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LettersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
