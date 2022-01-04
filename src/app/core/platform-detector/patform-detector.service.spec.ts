import { TestBed } from '@angular/core/testing';

import { PatformDetectorService } from './patform-detector.service';

describe('PatformDetectorService', () => {
  let service: PatformDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatformDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
