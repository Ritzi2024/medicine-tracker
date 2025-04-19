import { IMedicine } from "./interfaces/IMedicine"

const localStorageKey = 'medicine-tracker:medicines';

export function saveDataToLS(data: IMedicine[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
}

export function fetchDataFromLS(): IMedicine[]{
    const medicines = localStorage.getItem(localStorageKey);
    return medicines ? JSON.parse(medicines): [];
}
