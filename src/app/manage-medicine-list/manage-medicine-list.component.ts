import { Component, computed, inject, signal } from '@angular/core';
import { ManageMedicineService } from './manage-medicine.service';
import { IMedicine } from '../../interfaces/IMedicine';
import { MatListModule } from '@angular/material/list';
import { MedicineDay, MedicineTime } from '../../enums';
import { EnumKeyPipe } from '../pipes/enum-key.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ManageMedicineComponent } from '../manage-medicine/manage-medicine.component';
import { fetchDataFromLS, saveDataToLS } from '../../storage';
import { v4 as uuidv4 } from 'uuid';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

export interface DialogData {
  medicine: IMedicine;
}

@Component({
  selector: 'app-manage-medicine-list',
  imports: [
    MatListModule,
    EnumKeyPipe,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    NgIf
  ],
  templateUrl: './manage-medicine-list.component.html',
  styleUrl: './manage-medicine-list.component.scss'
})
export class ManageMedicineListComponent {
  medicines = signal<IMedicine[]>(this.loadMedicines());

  readonly MedicineDay = MedicineDay;
  readonly MedicineTime = MedicineTime;

  private readonly manageMedicineService = inject(ManageMedicineService);
  private readonly dialog = inject(MatDialog);

  // Time group order
  readonly timeGroups = Object.values(MedicineTime).filter(val => typeof val === 'number') as MedicineTime[];

  // Grouped signal (reacts to changes)
  readonly groupedMedicines = computed(() => {
    const grouped: Record<MedicineTime, IMedicine[]> = {} as any;
    for (const time of this.timeGroups) {
      grouped[time] = this.medicines().filter(m => m.time === time);
    }
    return grouped;
  });

  loadMedicines(): IMedicine[] {
    return fetchDataFromLS();
  }

  goToMedicine(medicine: IMedicine) {
    this.openDialog(medicine);
  }

  addNew() {
    this.openDialog();
  }

  removeMedicine(id: string) {
    const updated = this.medicines().filter(m => m.id !== id);
    this.updateStorage(updated);
  }

  openDialog(medicine?: IMedicine) {
    const dialogRef = this.dialog.open(ManageMedicineComponent, {
      data: {
        medicine
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog result:", result);
      if (result) {
        if(medicine?.id){
          result.id = medicine?.id;
        }
        this.saveMedicine(result);
      }
    });
  }

  saveMedicine(medicine: IMedicine): void {
    const current = this.medicines();
    const updated = current.some(m => m.id === medicine.id)
      ? current.map(m => (m.id === medicine.id ? medicine : m))
      : [...current, { ...medicine, id: uuidv4() }];

    this.updateStorage(updated);
  }

  private updateStorage(medicines: IMedicine[]): void {
    saveDataToLS(medicines);
    this.medicines.set(medicines);
  }
}
