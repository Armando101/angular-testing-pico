import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private readonly valueService: ValueService) {}

  getValue() {
    return this.valueService.getValue();
  }
}
