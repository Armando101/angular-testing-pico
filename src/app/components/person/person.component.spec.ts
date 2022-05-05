import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Life cycle
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a <p> with "Im a paragraph"', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const textExpected = 'Im a paragraph';
    const personElement: HTMLElement = personDebug.nativeElement;
    const p = personElement.querySelector('p');
    expect(p.textContent).toBe(textExpected);
  });

  it('should have a <h3> with "Hello, Im a person component"', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const textExpected = 'Hello, Im a person component';
    const h3Element: HTMLElement = h3Debug.nativeElement;
    expect(h3Element.textContent).toBe(textExpected);
  });
});
