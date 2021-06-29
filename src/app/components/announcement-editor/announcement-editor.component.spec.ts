import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementEditorComponent } from './announcement-editor.component';

describe('AnnouncementEditorComponent', () => {
  let component: AnnouncementEditorComponent;
  let fixture: ComponentFixture<AnnouncementEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
