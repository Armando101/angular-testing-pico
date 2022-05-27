import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';

import { OthersComponent } from './others.component';
import { ProductsService } from '../../services/product.service';
import { mockObservable } from '../../../testing/async-data';
import { generateManyProducts } from '../../mocks/product.mock';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      declarations: [OthersComponent, ReversePipe],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    const productsMock = generateManyProducts();
    productService.getAll.and.returnValue(mockObservable(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
