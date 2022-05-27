import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]',
})
// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  // tslint:disable-next-line: typedef
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
