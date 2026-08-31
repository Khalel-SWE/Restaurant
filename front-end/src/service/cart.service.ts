import { Injectable } from '@angular/core';
import {ProductOrder} from "../model/product-order";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productOrders: ProductOrder[] = [];//0
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalOrderSize: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addProductToOrder(product: ProductOrder){

    let isExist: boolean = false;
    let existedProduct: ProductOrder | undefined = undefined;

    if(this.productOrders.length > 0){
      existedProduct = this.productOrders.find(productOrder => productOrder.id === product.id);
    }

    isExist = (existedProduct !== undefined);

    if(existedProduct){
      existedProduct.quantity++;
    } else {
      this.productOrders.push(product)
    }

    this.calculateTotals();
  }

  calculateTotals(){
    let totalElementPrice: number = 0;
    let totalElementSize: number = 0;

    for(let order of this.productOrders){
      totalElementPrice += order.quantity * order.price;
      totalElementSize += order.quantity;
    }

    this.totalPrice.next(totalElementPrice);
    this.totalOrderSize.next(totalElementSize);

    console.log(this.productOrders)
    console.log(this.totalPrice)
    console.log(this.totalOrderSize)
  }

  removeProduct(product: ProductOrder){
    product.quantity--;
    if (product.quantity === 0) {
      this.remove(product);
    }

    this.calculateTotals();
  }

  remove(product: ProductOrder) {
    let index = this.productOrders.findIndex(productOrder => productOrder.id === product.id); // 0 ....    2
    if(index > -1){
      this.productOrders.splice(index, 1)
    }
  }
}
