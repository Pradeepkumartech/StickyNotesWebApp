import { TestBed } from '@angular/core/testing';

import { ManageStickNotesService } from './manage-stick-notes.service';

describe('ManageStickNotesService', () => {
  let service: ManageStickNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageStickNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
