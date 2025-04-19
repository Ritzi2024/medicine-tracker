import { Validators } from '@angular/forms';

export const IMedicineValidator = {
  name: [Validators.required],
  description: [], // optional field
  treatmentFor: [Validators.required],
  dosage: [Validators.required, Validators.min(1)],
  time: [Validators.required],
  day: [Validators.required],
  referredBy: [Validators.required],
  firstStarted: [],
  additionalNotes: []
};
