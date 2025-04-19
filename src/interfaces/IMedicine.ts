import { MedicineDay, MedicineTime } from "../enums";

export interface IMedicine {
    id: string;
    name: string;
    description?: string;
    treatmentFor: string;
    dosage: number;
    time: MedicineTime;
    day: MedicineDay;
    referredBy: string;
    firstStarted?: string;
    additionalNotes?: string;
}