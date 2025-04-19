import { TestBed } from '@angular/core/testing';

import { ManageMedicineService } from './manage-medicine.service';

describe('ManageMedicineService', () => {
  let service: ManageMedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageMedicineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
