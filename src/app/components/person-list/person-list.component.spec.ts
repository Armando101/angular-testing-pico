import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';
import { PersonComponent } from '../person/person.component';

import { PersonListComponent } from './person-list.component';

describe('PersonListComponent', () => {
  let component: PersonListComponent;
  let fixture: ComponentFixture<PersonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonListComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    // Arrange
    const personList = [
      new Person('Peter', 'Parker', 24, 70, 1.7),
      new Person('Armando', 'Rivera', 24, 80, 1.8),
      new Person('Bruce', 'Wayne', 24, 80, 1.8),
    ];
    component.personList = personList;

    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    // Assert
    expect(debugElement.length).toEqual(3);
  });

  it('should show a selected person', () => {
    // Arrange
    const personList = [
      new Person('Peter', 'Parker', 24, 70, 1.7),
      new Person('Armando', 'Rivera', 24, 80, 1.8),
      new Person('Bruce', 'Wayne', 24, 80, 1.8),
    ];
    component.personList = personList;

    // Act
    fixture.detectChanges();
    const debugButtonList = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );

    debugButtonList.triggerEventHandler('click', null);
    fixture.detectChanges();
    const debugPersonSelectedInfo = fixture.debugElement.queryAll(
      By.css('.selectedPerson ul li')
    );

    // Assert

    expect(debugPersonSelectedInfo[0].nativeElement.textContent).toContain(
      personList[0].name
    );
    expect(debugPersonSelectedInfo[1].nativeElement.textContent).toContain(
      personList[0].age
    );

    expect(component.selectedPerson).toEqual(component.personList[0]);
  });
});
