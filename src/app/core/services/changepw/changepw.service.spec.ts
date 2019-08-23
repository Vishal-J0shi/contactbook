import { TestBed } from '@angular/core/testing';

import { ChangepwService } from './changepw.service';

describe('ChangepwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangepwService = TestBed.get(ChangepwService);
    expect(service).toBeTruthy();
  });
});
