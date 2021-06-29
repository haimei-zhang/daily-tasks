import { TestBed } from '@angular/core/testing';

import { DiaryStoreServiceService } from './diary-store-service.service';

describe('DiaryStoreServiceService', () => {
  let service: DiaryStoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryStoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
