import { TestBed, inject } from '@angular/core/testing';

import { BucketlistItemsService } from './bucket-items.service';

describe('BucketlistItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketlistItemsService]
    });
  });

  it('should be created', inject([BucketlistItemsService], (service: BucketlistItemsService) => {
    expect(service).toBeTruthy();
  }));
});
