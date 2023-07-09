import { TestBed } from '@angular/core/testing';

import { NavigationButtonService } from './navigation-button.service';

describe('NavigationButtonService', () => {
  let service: NavigationButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
