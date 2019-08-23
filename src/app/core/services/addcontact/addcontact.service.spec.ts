import { TestBed } from '@angular/core/testing';

import { AddcontactService } from './addcontact.service';

describe('AddcontactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddcontactService = TestBed.get(AddcontactService);
    expect(service).toBeTruthy();
  });
});
