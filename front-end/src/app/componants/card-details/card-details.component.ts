import { Component } from '@angular/core';
import {CartService} from "../../../service/cart.service";
import {ProductOrder} from "../../../model/product-order";
import {RequestOrderService} from "../../../service/request-order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent {

  productOrders: ProductOrder[] = [];
  totalProductSize: number = 0;
  totalProductPrice: number = 0;

  constructor(private cartService: CartService, private requestOrderService :RequestOrderService, private router: Router) {

  }

  ngOnInit(): void {
    this.productOrders = this.cartService.productOrders;

    this.cartService.totalOrderSize.subscribe(
      value => this.totalProductSize = value
    )
    this.cartService.totalPrice.subscribe(
      value => this.totalProductPrice = value
    )
  }

  addProduct(productOrder: ProductOrder){
    this.cartService.addProductToOrder(productOrder);
  }
  removeSelectedProduct(productOrder: ProductOrder){
    this.cartService.removeProduct(productOrder);
  }
  removeFullProduct(productOrder: ProductOrder){
    this.cartService.remove(productOrder);
  }

createOrder() {

  const confirmOrder = confirm(
  'Confirm your order?'
   );

    if (!confirmOrder) {
  return;
  }

  const productIds = this.cartService.productOrders.map(or => or.id);

  this.requestOrderService.createOrder(productIds, this.totalProductPrice, this.totalProductSize).subscribe(
    response => {

      console.log(response);

      this.cartService.productOrders = [];
      this.cartService.totalPrice.next(0);
      this.cartService.totalOrderSize.next(0);
      this.router.navigateByUrl("/order-code/" + response.code);
    },
    error => {
      console.log("Error Details:", error);
      
      const errorMsg = error.error?.message;

      if (errorMsg === "PROFILE_INCOMPLETE") {
        alert(" من فضلك أكمل بيانات ملفك الشخصي (العنوان ورقم الهاتف) أولاً لتتمكن من إتمام الطلب.");
        this.router.navigateByUrl("/profile");
      } else {
        alert(" حدث خطأ غير متوقع: " + (errorMsg || "برجاء المحاولة لاحقاً"));
      }
    }
  );
}

clearCart() {

  const confirmClear = confirm(
    'Are you sure you want to clear cart?'
  );

  if (!confirmClear) {
    return;
  }

  this.cartService.productOrders = [];

  this.cartService.totalPrice.next(0);

  this.cartService.totalOrderSize.next(0);

}

}
