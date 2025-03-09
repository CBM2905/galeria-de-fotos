import { TestBed } from '@angular/core/testing';

import { PhotosService } from './photos.service';

describe('PhotoService', () => {
  let service: PhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
