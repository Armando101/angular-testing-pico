import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../mocks/product.mock';
import { Product } from '../models/product.model';
import { ProductsService } from './product.service';

fdescribe('ProductService', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts();

      // Act
      productService.getAllSimple().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });
  });

  describe('test for getAll', () => {
    it('should return a product list', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts();

      // Act
      productService.getAll().subscribe((data) => {
        // Assert
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });

    it('should return product list with taxes', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        { ...generateOneProduct(), price: 100 },
        { ...generateOneProduct(), price: 200 },
        { ...generateOneProduct(), price: 300 },
      ];

      // Act
      productService.getAll().subscribe((data) => {
        expect(data[0].taxes).toBe(19);
        expect(data[1].taxes).toBe(38);
        expect(data[2].taxes).toBe(57);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });

    it('should return product list with taxes testing not happy path', (doneFn) => {
      // Arrange
      const mockData: Product[] = [
        { ...generateOneProduct(), price: 0 },
        { ...generateOneProduct(), price: -100 },
      ];

      // Act
      productService.getAll().subscribe((data) => {
        expect(data[0].taxes).toBe(0);
        expect(data[1].taxes).toBe(0);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      httpController.verify();
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      // Arrange
      const mockData: Product[] = generateManyProducts(3);
      const limit = '10';
      const offset = '3';

      // Act
      productService.getAll(limit, offset).subscribe((data) => {
        expect(data.length).toBe(mockData.length);
        doneFn();
      });
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      httpController.verify();
    });
  });
});
