import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  eventList: string[],
  withTestId = false
) {
  let debugElement: DebugElement;
  if (withTestId) {
    debugElement = queryById(fixture, selector);
  } else {
    debugElement = query(fixture, selector);
  }

  const inputEl: HTMLInputElement = debugElement.nativeElement;
  inputEl.value = value;
  eventList.map((item) => {
    inputEl.dispatchEvent(new Event(item));
  });
}
