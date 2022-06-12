import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedData } from '../models/paginated-data';
import { Pagination } from '../models/pagination';
import { PostProduct } from '../models/post-product';
import { Product } from '../models/product';
import { PutProduct } from '../models/put-product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }

  get(pagination?: Pagination): Observable<PaginatedData<Product>> {
    return this.httpClient
          .get<PaginatedData<Product>>('http://localhost:1234/Products?'
          + 'SortColumn=' + (pagination?.sortColumn ?? 'name')
          + '&Page=' + (pagination?.page ?? 1)
          + '&RowsPerPage=' + (pagination?.rowsPerPage ?? 10)
          + '&SortAscending=' + (pagination?.sortAscending ?? true));
  }

  getById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:1234/Products/' + productId);
  }

  put(productId: number, dto: PutProduct): Observable<Product> {
    return this.httpClient.put<Product>('http://localhost:1234/Products/' + productId, dto)
  }

  post(dto: PostProduct): Observable<Product> {
    return this.httpClient.post<Product>('http://localhost:1234/Products', dto)
  }

  delete(productId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>('http://localhost:1234/Products/' + productId);
  }
}
