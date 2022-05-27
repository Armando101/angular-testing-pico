import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { getText, queryAllByDirective } from '../testing/finders';
import { clickElement, query } from 'src/testing';
import { AppModule } from './app.module';
import { routes } from './app-routing.module';
import { ProductsService } from './services/product.service';
import { generateManyProducts } from './mocks/product.mock';
import { asyncData } from '../testing/async-data';

fdescribe('App integration test', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('productService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // providers
    router = TestBed.inject(Router);
    router.initialNavigation();
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;

    tick(); // Wait untill navigation
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 6 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(6);
  });

  it('should render OthersComponent when clicked', fakeAsync(() => {
    const productsMock = generateManyProducts(10);
    productService.getAll.and.returnValue(asyncData(productsMock));
    clickElement(fixture, 'others-link', true);
    tick();
    fixture.detectChanges();

    tick();
    fixture.detectChanges();

    const element = query(fixture, 'app-others');
    const text = getText(fixture, 'products-length');
    expect(router.url).toEqual('/others');
    expect(element).not.toBeNull();
    expect(text).toContain(`${productsMock.length}`);
  }));

  it('should render PeopleComponent when clicked', fakeAsync(() => {
    clickElement(fixture, 'people-link', true);
    tick();
    fixture.detectChanges();

    expect(router.url).toEqual('/people');
    const element = query(fixture, 'app-person-list');
    expect(element).not.toBeNull();
  }));
});
