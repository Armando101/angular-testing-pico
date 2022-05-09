import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[highligth]',
})
export class HighligthDirective implements OnChanges {
  defaultColor = 'gray';
  @Input('highligth') bgColor = '';

  constructor(private readonly element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges() {
    this.element.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }
}
