import { ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { IMedicine } from '../../interfaces/IMedicine';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IMedicineValidator } from '../../validators/IMedicine';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { enumToDropdownOptions, fieldHasErrors, getFieldErrors } from '../../utilities';
import { MedicineDay, MedicineTime } from '../../enums';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { EnumKeyPipe } from '../pipes/enum-key.pipe';

@Component({
  selector: 'app-manage-medicine',
  imports: [
    MatDialogModule, 
    MatButtonModule, MatLabel,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    EnumKeyPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './manage-medicine.component.html',
  styleUrl: './manage-medicine.component.scss'
})
export class ManageMedicineComponent {
  medicineDayOptions: { key: string; value: number }[] = [];
  medicineTimeOptions: { key: string; value: number }[] = [];
  medicineForm: FormGroup;

  readonly MedicineDay = MedicineDay;
  readonly MedicineTime = MedicineTime;

  data = inject(MAT_DIALOG_DATA);
  medicine: IMedicine;

  constructor(private fb: FormBuilder){
    this.medicineForm = this.fb.group({
      name: ['', IMedicineValidator.name],
      description: ['', IMedicineValidator.description],
      treatmentFor: ['', IMedicineValidator.treatmentFor],
      dosage: [null, IMedicineValidator.dosage],
      time: [null, IMedicineValidator.time],
      day: [null, IMedicineValidator.day],
      referredBy: ['', IMedicineValidator.referredBy],
      firstStarted: ['', IMedicineValidator.firstStarted],
      additionalNotes: ['', IMedicineValidator.additionalNotes]
    });
    this.medicineDayOptions = enumToDropdownOptions(MedicineDay);
    this.medicineTimeOptions = enumToDropdownOptions(MedicineTime);
    console.log(this.data);
    this.medicine = this.data.medicine;

    if(this.medicine){
      this.medicineForm.patchValue({
        name: this.medicine.name,
        description: this.medicine.description,
        treatmentFor: this.medicine.treatmentFor,
        day: this.medicine.day,
        time: this.medicine.time,
        dosage: this.medicine.dosage,
        referredBy: this.medicine.referredBy,
        firstStarted: this.medicine.firstStarted,
        additionalNotes: this.medicine.additionalNotes
      })
    }
  }
}