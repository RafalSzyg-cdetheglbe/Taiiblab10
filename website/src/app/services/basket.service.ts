import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from '../models/basket-item';
import { PostBasketItem } from '../models/post-basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private httpClient: HttpClient) { }

  get(userId: number): Observable<BasketItem[]> {
    return this.httpClient.get<BasketItem[]>('http://localhost:1234/Basket/' + userId);
  }

  post(dto: PostBasketItem): Observable<BasketItem[]> {
    return this.httpClient.post<BasketItem[]>('http://localhost:1234/Basket', dto);
  }

  put(basketItemId: number, count: number): Observable<BasketItem[]> {
    return this.httpClient.put<BasketItem[]>('http://localhost:1234/Basket/' + basketItemId
     + '?count=' + count, null);
  }

  delete(basketItemId: number): Observable<BasketItem[]> {
    return this.httpClient.delete<BasketItem[]>('http://localhost:1234/Basket/' + basketItemId);
  }

  clear(userId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>('http://localhost:1234/Basket/clear/' + userId);
  }
}
