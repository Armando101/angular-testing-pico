import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

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
    component.person = new Person('Armando', 'Rivera', 24, 80, 180);
    fixture.detectChanges(); // Life cycle
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the name "Ricardo"', () => {
    component.person = new Person('Ricardo', 'Rivera', 24, 80, 180);
    expect(component.person.name).toBe('Ricardo');
  });

  it('should have a <h3> with "Hello, Im ${component.person.name}"', () => {
    // Arrange
    component.person = new Person('Valentina', 'Rivera', 24, 80, 180);
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const textExpected = `Hello, Im ${component.person.name}`;
    const h3Element: HTMLElement = h3Debug.nativeElement;

    // Act
    fixture.detectChanges();

    // Assert
    expect(h3Element.textContent).toBe(textExpected);
  });

  it('should have a <p> with "My weigth is ${component.person.heigth}', () => {
    // Arrange
    component.person = new Person('Valentina', 'Rivera', 24, 80, 150);
    const personDebug: DebugElement = fixture.debugElement;
    const textExpected = `${component.person.heigth}`;
    const personElement: HTMLElement = personDebug.nativeElement;
    const p = personElement.querySelector('p');

    // Act
    fixture.detectChanges();
    // Assert
    expect(p.textContent).toContain(textExpected);
  });
});
