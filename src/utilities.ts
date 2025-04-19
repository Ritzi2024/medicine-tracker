import { FormControl } from "@angular/forms";

export function enumToDropdownOptions<T extends object>(enumObj: T): { key: string; value: number }[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key))) // filters out reverse numeric keys
      .map(key => ({
        key,
        value: (enumObj as any)[key]
      }));
  }
  
  export function getFieldErrors(formControl: FormControl, fieldName: string): string[] {
    const errors = formControl?.errors;
    const errorMessages = [];
  
    if (errors?.["required"]) {
      errorMessages.push(`${fieldName} is required`);
    }
    if (errors?.["minlength"]) {
      errorMessages.push(`${fieldName} must be at least ${errors["minlength"].requiredLength} characters long`);
    }
    if (errors?.["pattern"]) {
      errorMessages.push(`${fieldName} must match the required pattern`);
    }
  
    return errorMessages;
  }
  
  export function fieldHasErrors(formControl: FormControl) {
    return formControl ? (formControl.errors && formControl.touched) : false;
  }
  