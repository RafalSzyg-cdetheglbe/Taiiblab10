import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { PutProduct } from 'src/app/models/put-product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, 
    private productsService: ProductsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      this.productsService.getById(p['id']).subscribe(res => {
        this.product = res;
        if(this.product == null)
          this.router.navigate(['/products']);
      });
    });
  }

  editProduct(): void {
    const dto: PutProduct = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price
    }
    this.productsService.put(this.product.id, dto).subscribe(res => {
        this.router.navigate(['/products']);
      });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
