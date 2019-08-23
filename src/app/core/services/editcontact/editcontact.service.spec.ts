import { TestBed } from '@angular/core/testing';

import { EditcontactService } from './editcontact.service';

describe('EditcontactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditcontactService = TestBed.get(EditcontactService);
    expect(service).toBeTruthy();
  });
});
