import { TestBed } from '@angular/core/testing';

import { EdituserService } from './edituser.service';

describe('EdituserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EdituserService = TestBed.get(EdituserService);
    expect(service).toBeTruthy();
  });
});
