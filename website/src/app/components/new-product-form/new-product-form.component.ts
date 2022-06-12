import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostProduct } from 'src/app/models/post-product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.css']
})
export class NewProductFormComponent implements OnInit {
  product: PostProduct = {
    name: "",
    description: "",
    price: 0
  };
  
  constructor(private router: Router,
    private productsService: ProductsService) { }

  ngOnInit(): void {}

  createProduct(): void {
    this.productsService.post(this.product).subscribe(res => {
      if(res.id > 0)  
        this.router.navigate(['/products']);
      });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
