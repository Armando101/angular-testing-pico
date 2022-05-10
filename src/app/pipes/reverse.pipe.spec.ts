import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReversePipe } from './reverse.pipe';

fdescribe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toBe('amor');
  });
});

@Component({
  template: `
    <h5>{{ 'amor' | reverse }}</h5>
    <input [(ngModel)]="text" />
    <p>{{ text | reverse }}</p>
  `,
})
class Hostcomponent {
  text = '';
}

fdescribe('ReservePipe from Hostcomponent', () => {
  let component: Hostcomponent;
  let fixture: ComponentFixture<Hostcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Hostcomponent, ReversePipe],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Hostcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should h5 be "roma"', () => {
    const debugh5 = fixture.debugElement.query(By.css('h5'));
    expect(debugh5.nativeElement.textContent).toBe('roma');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const inputdebug = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputdebug.nativeElement;
    const pdebug = fixture.debugElement.query(By.css('p'));

    expect(pdebug.nativeElement.textContent).toBeFalsy();

    inputElement.value = 'my text';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pdebug.nativeElement.textContent).toBe('txet ym');
  });
});
