import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumKey' })
export class EnumKeyPipe implements PipeTransform {
  transform(value: number | string, enumObj: any): string {
    // Get the enum key from the numeric value or string key
    const rawKey = enumObj[value];
    console.log(rawKey);
    if (!rawKey) return '';

    // Convert 'BEFORE_BREAKFAST' → 'Before Breakfast'
    return rawKey
      .toLowerCase()
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
