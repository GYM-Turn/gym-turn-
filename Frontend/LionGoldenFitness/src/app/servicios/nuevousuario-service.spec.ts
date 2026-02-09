import { TestBed } from '@angular/core/testing';

import { NuevousuarioService } from './nuevousuario-service';

describe('NuevousuarioService', () => {
  let service: NuevousuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevousuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
