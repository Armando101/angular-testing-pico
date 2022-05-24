import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';
import { queryAllByDirective } from 'src/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
})
class BannerStubComponent {}
@Component({
  selector: 'app-footer',
})
class FooterStubComponent {}

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        BannerStubComponent,
        FooterStubComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should there are 6 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(6);
  });

  it('should there are 6 routerLinks with match routes', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks = links.map((link) =>
      link.injector.get(RouterLinkDirectiveStub)
    );
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
    expect(routerLinks[2].linkParams).toEqual('/products');
    expect(routerLinks[3].linkParams).toEqual('/people');
    expect(routerLinks[4].linkParams).toEqual('/others');
    expect(routerLinks[5].linkParams).toEqual('/auth/login');
  });
});
