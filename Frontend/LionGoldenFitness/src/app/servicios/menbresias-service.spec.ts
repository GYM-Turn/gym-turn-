import { TestBed } from '@angular/core/testing';

import { MenbresiasService } from './menbresias-service';

describe('MenbresiasService', () => {
  let service: MenbresiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenbresiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
