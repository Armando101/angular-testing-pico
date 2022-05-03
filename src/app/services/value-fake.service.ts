import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeValueService {
  constructor() {}

  getValue() {
    return 'fake value';
  }

  setValue(value: string) {}

  getPromise() {
    return Promise.resolve('fake Promise - value');
  }
}
