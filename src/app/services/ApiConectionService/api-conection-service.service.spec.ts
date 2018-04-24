import { TestBed, inject } from '@angular/core/testing';

import { ApiConectionServiceService } from './api-conection-service.service';

describe('ApiConectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiConectionServiceService]
    });
  });

  it('should be created', inject([ApiConectionServiceService], (service: ApiConectionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
