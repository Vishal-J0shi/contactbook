import { TestBed } from '@angular/core/testing';

import { DeleteuserService } from './deleteuser.service';

describe('DeleteuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteuserService = TestBed.get(DeleteuserService);
    expect(service).toBeTruthy();
  });
});
