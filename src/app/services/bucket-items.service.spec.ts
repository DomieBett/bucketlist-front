import { TestBed, inject } from '@angular/core/testing';

import { BucketItemsService } from './bucket-items.service';

describe('BucketlistItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketItemsService]
    });
  });

  it('should be created', inject([BucketItemsService], (service: BucketItemsService) => {
    expect(service).toBeTruthy();
  }));
});
