import { TestBed } from '@angular/core/testing';

import { GetcontactService } from './getcontact.service';

describe('GetcontactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetcontactService = TestBed.get(GetcontactService);
    expect(service).toBeTruthy();
  });
});
