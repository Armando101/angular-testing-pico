import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { generateOneProduct } from 'src/app/mocks/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import {
  ActivatedRouteStub,
  asyncData,
  getText,
  mockObservable,
} from 'src/testing';

import { ProductDetailComponent } from './product-detail.component';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let route: ActivatedRouteStub;
  let productsService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const routeStub = new ActivatedRouteStub();
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getOne',
    ]);
    const locationeSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: routeStub,
        },
        {
          provide: ProductsService,
          useValue: productsServiceSpy,
        },
        {
          provide: Location,
          useValue: locationeSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    productsService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should create', () => {
    const productId = '1';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };

    productsService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show the product in the view', () => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };

    productsService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges();
    const titleText = getText(fixture, 'title');
    const priceText = getText(fixture, 'price');

    expect(titleText).toContain(productMock.title);
    expect(priceText).toContain(`${productMock.price}`);
    expect(productsService.getOne).toHaveBeenCalledWith(productId);
  });

  it('should go to back without id params', () => {
    route.setParamMap({});
    location.back.and.callThrough();

    fixture.detectChanges();
    expect(location.back).toHaveBeenCalled();
  });

  it('should change from "loading" to "succes"', fakeAsync(() => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId,
    };

    productsService.getOne.and.returnValue(asyncData(productMock));
    fixture.detectChanges();
    expect(component.state).withContext('from init to loading').toBe('loading');

    tick();
    fixture.detectChanges();

    expect(component.state)
      .withContext('from loading to success')
      .toBe('success');
  }));
});
