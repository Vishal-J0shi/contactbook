import { TestBed } from '@angular/core/testing';

import { UpdateprofileService } from './updateprofile.service';

describe('UpdateprofileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateprofileService = TestBed.get(UpdateprofileService);
    expect(service).toBeTruthy();
  });
});
