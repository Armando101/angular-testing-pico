import { Component, DebugElement, Host } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
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

  it('should display a text with IMC when call calcIMC', () => {
    // Arrange
    const expectMsg = 'overweigth level 1';
    component.person = new Person('Juan', 'Hernandez', 30, 80, 1.65);
    const buttonElement = fixture.debugElement.query(
      By.css('.btn-imc')
    ).nativeElement;

    // Act
    component.calcIMC();
    fixture.detectChanges();

    // Assert
    expect(buttonElement.textContent).toContain(expectMsg);
  });

  it('should display a text with IMC when do click', () => {
    // Arrange
    const expectMsg = 'overweigth level 1';
    component.person = new Person('Juan', 'Hernandez', 30, 80, 1.65);
    const buttonDebug = fixture.debugElement.query(By.css('.btn-imc'));
    const buttonElement = buttonDebug.nativeElement;
    // Act
    // Tipo de evento a ejecutar (click)
    // Parámetros o tipo de evento que se ejecute en el click
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(buttonElement.textContent).toContain(expectMsg);
  });

  it('should raise selected event when do click', () => {
    // Arrange
    const expectedPerson = new Person('Juan', 'Hernandez', 30, 80, 1.65);
    component.person = expectedPerson;
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => {
      selectedPerson = person;
      expect(person).toEqual(expectedPerson);
    });
    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(selectedPerson).toEqual(expectedPerson);
  });
});

@Component({
  template: `
    <app-person [person]="person" (onSelected)="onSelected($event)"></app-person
    >'
  `,
})
class HostComponent {
  person = new Person('Peter', 'Parker', 12, 40, 1.5);
  selectedPerson: Person;
  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // Arrange
    const expectedName = component.person.name;
    const personH3Debug = fixture.debugElement.query(By.css('app-person h3'));
    const personH3Element = personH3Debug.nativeElement;
    // Act

    fixture.detectChanges();
    // Assert
    expect(personH3Element.textContent).toContain(expectedName);
  });

  it('should raise selected event when clicked', () => {
    // Arrange
    const buttonDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );

    // Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Assert
    expect(component.selectedPerson).toEqual(component.person);
  });
});
