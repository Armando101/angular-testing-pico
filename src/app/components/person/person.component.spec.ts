import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    const textExpected = 'Im a paragraph';
    const personElement: HTMLElement = fixture.nativeElement;
    const p = personElement.querySelector('p');
    expect(p.textContent).toBe(textExpected);
  });
});
