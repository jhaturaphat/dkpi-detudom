import { TestBed } from '@angular/core/testing';

import { ItemsKpiService } from './items-kpi.service';

describe('ItemsKpiService', () => {
  let service: ItemsKpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsKpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
