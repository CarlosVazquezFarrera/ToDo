import { TestBed } from '@angular/core/testing';

import { ModalsService } from './modals.service';

describe('ModalesService', () => {
  let service: ModalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
