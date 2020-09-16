import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStickyNotesComponent } from './manage-sticky-notes.component';

describe('ManageStickyNotesComponent', () => {
  let component: ManageStickyNotesComponent;
  let fixture: ComponentFixture<ManageStickyNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStickyNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStickyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
