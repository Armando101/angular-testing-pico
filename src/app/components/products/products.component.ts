import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/product.service';
import { ValueService } from 'src/app/services/value.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  rta: string;

  constructor(
    private readonly productService: ProductsService,
    private readonly valueService: ValueService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productService
      .getAll(String(this.limit), String(this.offset))
      .subscribe(
        (products) => {
          this.products = [...this.products, ...products];
          this.offset += this.limit;
          this.status = 'success';
        },
        (error) => {
          setTimeout(() => {
            this.products = [];
            this.status = 'error';
          }, 300);
        }
      );
  }

  async callPromise() {
    const rta = await this.valueService.getPromise();
    this.rta = rta;
  }
}
