import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighligthDirective } from './highligth.directive';

@Component({
  template: `
    <h5 class="title" highligth>There is some value</h5>
    <h5 highligth="yellow">There is some value</h5>
    <p highligth="blue">Parrafo</p>
    <p>otro parrafo</p>
  `,
})
class Hostcomponent {}

fdescribe('HighligthDirective', () => {
  let component: Hostcomponent;
  let fixture: ComponentFixture<Hostcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Hostcomponent, HighligthDirective],
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

  it('should applied directive to three elements', () => {
    // const elements = fixture.debugElement.queryAll(By.css('*[highligth]'));
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );
    const elementsWithoutDirective = fixture.debugElement.queryAll(
      By.css('*:not([highligth])')
    );

    expect(elements.length).toEqual(3);
    expect(elementsWithoutDirective.length).toEqual(1);
  });

  it('should the elements be match with bgColor', () => {
    const elements = fixture.debugElement.queryAll(
      By.directive(HighligthDirective)
    );

    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
  });

  it('should the h5.title be defaultColor', () => {
    const element = fixture.debugElement.query(By.css('.title'));
    const dir = element.injector.get(HighligthDirective);

    expect(element.nativeElement.style.backgroundColor).toEqual(
      dir.defaultColor
    );
  });
});
