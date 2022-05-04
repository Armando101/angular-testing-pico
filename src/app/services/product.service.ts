import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError, zip } from 'rxjs';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from './../models/product.model';
import { environment } from './../../environments/environment';
import { HttpStatusCode } from 'src/helpers/HttpStatusCode';
import {
  CONFLICT_MSG,
  DEFAULT_ERROR_MSG,
  NOT_FOUND_PRODUCT_MSG,
  UNAUTHORIZED_MSG,
} from '../constants/errors.constants';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getAll(limit?: string, offset?: string): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params }).pipe(
      retry(3),
      map((products) =>
        products.map((item) => {
          return {
            ...item,
            taxes: item.price > 0 ? 0.19 * item.price : 0,
          };
        })
      )
    );
  }

  getAllSimple() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(this.getOne(id), this.update(id, dto));
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(CONFLICT_MSG);
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(NOT_FOUND_PRODUCT_MSG);
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(UNAUTHORIZED_MSG);
        }
        return throwError(DEFAULT_ERROR_MSG);
      })
    );
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<{ rta: boolean }>(`${this.apiUrl}/products/${id}`);
  }
}
