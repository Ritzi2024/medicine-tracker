import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageMedicineListComponent } from './manage-medicine-list.component';


describe('ManageMedicineListComponent', () => {
  let component: ManageMedicineListComponent;
  let fixture: ComponentFixture<ManageMedicineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMedicineListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMedicineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
