import { Injectable } from '@angular/core';
import { fetchDataFromLS, saveDataToLS } from '../../storage';
import { IMedicine } from '../../interfaces/IMedicine';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ManageMedicineService {

  medicines: IMedicine[] = [];
  constructor() { }

  getAllMedicines$() {
    // return dummyMedicines;
    if(this.medicines.length === 0) {
      this.medicines = fetchDataFromLS();
      console.log(this.medicines);
    }
    return this.medicines;
  }

  saveMedicine$(medicine: IMedicine) {
    const medIndex = this.medicines.findIndex(med => med.id === medicine.id);
    if(medIndex !== -1){
      this.medicines[medIndex]= medicine;
    } else {
      medicine.id = uuidv4();
      this.medicines.push(medicine);
    }
    saveDataToLS(this.medicines);
  }

  removeMedicine$(id: string) {
    const medIndex = this.medicines.findIndex(med => med.id === id);
    if(medIndex !== -1){
      this.medicines.splice(medIndex, 1);
      saveDataToLS(this.medicines);
    }
  }
}
