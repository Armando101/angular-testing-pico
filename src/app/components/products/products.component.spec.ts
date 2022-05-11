import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { generateManyProducts } from 'src/app/mocks/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ValueService } from 'src/app/services/value.service';
import {
  asyncData,
  asyncError,
  mockObservable,
  mockPromise,
} from 'src/testing';
import { getText, query } from 'src/testing';
import { ProductComponent } from '../product/product.component';

import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', [
      'getPromise',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: productServiceSpy,
        },
        {
          provide: ValueService,
          useValue: valueServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
    const productsMock = generateManyProducts();
    productService.getAll.and.callFake(() => mockObservable(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll method', () => {
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('tests for getAllProducts', () => {
    it('should return a product list from service', () => {
      // Arrange
      const productsMock = generateManyProducts();
      const countPrev = component.products.length;
      productService.getAll.and.callFake(() => mockObservable(productsMock));
      fixture.detectChanges();

      // Act
      component.getAllProducts();

      // Assert
      expect(component.products.length).toEqual(
        productsMock.length + countPrev
      );
    });

    it('should change the status "loading" => "success"', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts();
      productService.getAll.and.returnValue(asyncData(productsMock));

      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');

      tick(); // Exec all pending observers, promises, setTimeout, etc;
      fixture.detectChanges();

      // Assert
      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" => "success" by clicking the button', fakeAsync(() => {
      // Arrange
      const productsMock = generateManyProducts();
      productService.getAll.and.returnValue(asyncData(productsMock));
      const debugButton = fixture.debugElement.query(
        By.css('.getAllProductsButton')
      );

      // Act
      debugButton.triggerEventHandler('click', null);
      fixture.detectChanges();

      const debugSpanButtonText = getText(fixture, 'spanText');
      expect(debugSpanButtonText).toContain('Loading');

      tick(); // Exec all pending observers, promises, setTimeout, etc;
      fixture.detectChanges();
      const debugSpanButtonAfter = getText(fixture, 'spanText');

      // Assert
      expect(component.status).toEqual('success');
      expect(debugSpanButtonAfter).toContain('Load more');
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      // Arrange
      productService.getAll.and.returnValue(
        asyncError(() => Promise.reject('Error'))
      );

      // Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');

      tick(400); // Exec all pending observers, promises, setTimeout, etc;
      fixture.detectChanges();

      // Assert
      expect(component.status).toEqual('error');
    }));
  });

  describe('tests for callPromise', () => {
    it('should call to promise', async () => {
      // Arrange
      const mockMsg = 'My mock string';
      valueService.getPromise.and.returnValue(mockPromise(mockMsg));

      // Act
      await component.callPromise();
      fixture.detectChanges();

      // Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromise).toHaveBeenCalled();
    });

    it('should call click promise button', fakeAsync(() => {
      // Arrange
      const mockMsg = 'My mock string';
      valueService.getPromise.and.returnValue(mockPromise(mockMsg));
      const debugButton = query(fixture, '[data-testid="promiseButton"]');
      // Act
      // component.callPromise();
      debugButton.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const debugRta = getText(fixture, 'rta');

      // Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromise).toHaveBeenCalled();
      expect(debugRta).toEqual(mockMsg);
    }));
  });
});
