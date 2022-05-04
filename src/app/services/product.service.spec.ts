import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { HttpStatusCode } from 'src/helpers/HttpStatusCode';
import {
  CONFLICT_MSG,
  DEFAULT_ERROR_MSG,
  NOT_FOUND_PRODUCT_MSG,
} from '../constants/errors.constants';
import {
  generateManyProducts,
  generateOneProduct,
} from '../mocks/product.mock';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
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

  afterEach(() => httpController.verify());

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
    });
  });

  describe('test for create', () => {
    it('should return a new product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new Product',
        price: 100,
        images: ['img'],
        description: 'my description',
        categoryId: 12,
      };

      // Act
      productService.create({ ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('test for update', () => {
    it('should return an update product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'update Product',
        description: 'my description',
        categoryId: 12,
      };
      const id = '5';
      // Act
      productService.update(id, { ...dto }).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('test for delete', () => {
    it('should delete product', (doneFn) => {
      // Arrange
      const id = '5';
      // Act
      productService.delete(id).subscribe((response) => {
        // Assert
        expect(response.rta).toBeTrue();
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush({ rta: true });
      expect(req.request.method).toEqual('DELETE');
    });
  });

  describe('test for getOne', () => {
    it('should return a product', (doneFn) => {
      // Arrange
      const mockData = generateOneProduct();
      const id = '5';
      // Act
      productService.getOne(id).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });

    it('should return the right message when the status code is 404', (doneFn) => {
      // Arrange
      const id = '5';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };

      // Act
      productService.getOne(id).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual(NOT_FOUND_PRODUCT_MSG);
          doneFn();
        },
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(null, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return the right message when the status code is 409', (doneFn) => {
      // Arrange
      const id = '5';
      const msgError = CONFLICT_MSG;
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError,
      };

      // Act
      productService.getOne(id).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual(CONFLICT_MSG);
          doneFn();
        },
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(null, mockError);
      expect(req.request.method).toEqual('GET');
    });
    it('should return default error', (doneFn) => {
      // Arrange
      const id = '5';
      const msgError = DEFAULT_ERROR_MSG;
      const mockError = {
        status: HttpStatusCode.BadGateway,
        statusText: msgError,
      };

      // Act
      productService.getOne(id).subscribe({
        error: (error) => {
          // Assert
          expect(error).toEqual(DEFAULT_ERROR_MSG);
          doneFn();
        },
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${id}`;
      const req = httpController.expectOne(url);
      req.flush(null, mockError);
      expect(req.request.method).toEqual('GET');
    });
  });
});
