import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { queryAll, queryAllByDirective, queryById } from 'src/testing/finders';
import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 data-testid="title" highligth>There is some value</h5>
    <h5 highligth="yellow">There is some value</h5>
    <p highligth="blue">Parrafo</p>
    <p>otro parrafo</p>
    <input data-testid="input" [(ngModel)]="color" [highligth]="color" />
  `,
})
class Hostcomponent {
  color = 'pink';
}

describe('HighligthDirective', () => {
  let component: Hostcomponent;
  let fixture: ComponentFixture<Hostcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Hostcomponent, HighligthDirective],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hostcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should applied directive to four elements', () => {
    // const elements = fixture.debugElement.queryAll(By.css('*[highligth]'));
    const elements = queryAllByDirective(fixture, HighligthDirective);
    const elementsWithoutDirective = queryAll(fixture, '*:not([highligth])');

    expect(elements.length).toEqual(4);
    expect(elementsWithoutDirective.length).toEqual(2);
  });

  it('should the elements be match with bgColor', () => {
    const elements = queryAllByDirective(fixture, HighligthDirective);

    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the h5.title be defaultColor', () => {
    const element = queryById(fixture, 'title');
    const dir = element.injector.get(HighligthDirective);

    expect(element.nativeElement.style.backgroundColor).toEqual(
      dir.defaultColor
    );
  });

  it('should bind <input/> and change backgroundColor', () => {
    const input = queryById(fixture, 'input');
    const inputElement: HTMLInputElement = input.nativeElement;

    expect(inputElement.style.backgroundColor).toEqual('pink');

    const newColor = 'cyan';
    inputElement.value = newColor;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.style.backgroundColor).toEqual(newColor);
    expect(component.color).toEqual(newColor);
  });
});
