import { TestBed } from '@angular/core/testing';

import { FilmProjectionService } from './film-projection.service';

describe('FilmProjectionService', () => {
  let service: FilmProjectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmProjectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
