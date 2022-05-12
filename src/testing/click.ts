import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { query, queryById } from './finders';

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false,
  event = null
) {
  let elementDebug: DebugElement;

  if (withTestId) {
    elementDebug = queryById(fixture, selector);
  } else {
    elementDebug = query(fixture, selector);
  }

  const element: HTMLElement = elementDebug.nativeElement;
  elementDebug.triggerEventHandler('click', event);
}

export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestId: boolean = false
) {
  let elementDebug: DebugElement;

  if (withTestId) {
    elementDebug = queryById(fixture, selector);
  } else {
    elementDebug = query(fixture, selector);
  }

  const element: HTMLElement = elementDebug.nativeElement;
  element.click();
}
