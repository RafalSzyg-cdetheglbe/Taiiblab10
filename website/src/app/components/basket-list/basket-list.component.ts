import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BasketItem } from 'src/app/models/basket-item';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css']
})
export class BasketListComponent implements OnInit {
  basketItems: BasketItem[] = [];
  hidden: boolean = false;
  btnStr: string = "hide";

  constructor(private basketService: BasketService) {
    this.basketService.get(jwtDecode(localStorage.getItem("jwt"))['userId']).subscribe(res => this.basketItems = res);
  }

  changeCount(basketItemId: number, count: number): void {
    this.basketService.put(basketItemId, count).subscribe(res => this.basketItems = res);
  }

  deleteBasketItem(basketItemId: number): void {
    this.basketService.delete(basketItemId).subscribe(res => this.basketItems = res);
  }

  clearBasket(): void {
    this.basketService.clear(jwtDecode(localStorage.getItem("jwt"))['userId']).subscribe(res => {
      if(res) this.basketItems = [];
    });
  }

  getCount(): number {
    return this.basketItems.length;
  }

  getPrice(): number {
    let sum = 0;
    this.basketItems.forEach(item => sum += (item.count * item.price));
    return sum;
  }

  isEmpty(): boolean {
    return this.basketItems.length <= 0;
  }

  toggle(): void {
    this.hidden = !this.hidden;
    if(this.hidden) this.btnStr = "show";
    else this.btnStr = "hide";
  }

  ngOnInit(): void {
  }

}
