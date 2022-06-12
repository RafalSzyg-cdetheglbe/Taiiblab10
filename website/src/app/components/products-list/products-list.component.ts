import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwtDecode from 'jwt-decode';
import { Pagination } from 'src/app/models/pagination';
import { PostBasketItem } from 'src/app/models/post-basket-item';
import { Product } from 'src/app/models/product';
import { BasketService } from 'src/app/services/basket.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  length: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private router: Router,
    private productsService: ProductsService,
    private basketService: BasketService,
    private jwtHelper: JwtHelperService) {
    this.update();
  }

  isAdmin():boolean {
    const token = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token))
      if(jwtDecode(localStorage.getItem("jwt"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] == 'admin')
        return true;
    return false;
  }

  addProduct(product: Product): void {
    const dto: PostBasketItem = {
      userId: jwtDecode(localStorage.getItem("jwt"))['userId'],
      productId: product.id,
      count: 1
    };
    this.basketService.post(dto).subscribe();
  }

  editProduct(productId: number): void {
    this.router.navigate(['/products/' + productId]);
  }

  deleteProduct(productId: number): void {
    this.productsService.delete(productId).subscribe(res => {
      if(res) this.update();
    });
  }

  addNewProduct(): void {
    this.router.navigate(['/products/add']);
  }

  update(event?: any): void {
    const pagination: Pagination = {
      page: 1,
      rowsPerPage: 10,
      sortAscending: true,
      sortColumn: "name"
    };

    if(event) {
      pagination.page = event.pageIndex + 1;
      pagination.rowsPerPage = event.pageSize
    }

    this.productsService.get(pagination).subscribe(res => {
      this.products = res.data;
      this.length = res.count;
    });
  }

  ngOnInit(): void {

  }
}
