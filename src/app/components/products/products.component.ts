import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'succes' | 'error' | 'init' = 'init';

  constructor(private readonly productService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productService
      .getAll(String(this.limit), String(this.offset))
      .subscribe((products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'succes';
      });
  }
}
