// import { Component, OnInit } from '@angular/core';
// import {RequestOrderService} from "../../../service/request-order.service";

// @Component({
//   selector: 'app-order-user',
//   templateUrl: './order-user.component.html',
//   styleUrls: ['./order-user.component.css']
// })
// export class OrderUserComponent implements OnInit {

//   orders: any;
//   constructor(private requestOrderService : RequestOrderService) { }

//   ngOnInit(): void {
//     this.requestOrderService.getOrder().subscribe(
//       value => this.orders = value
//     )
//   }


// }


import { Component, OnInit } from '@angular/core';
import { RequestOrderService } from "../../../service/request-order.service";

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.css']
})
export class OrderUserComponent implements OnInit {

  orders: any = {};

  totalOrders: number = 0;

  totalPrice: number = 0;

  constructor(private requestOrderService: RequestOrderService) { }

  ngOnInit(): void {

    this.requestOrderService.getOrder().subscribe({

      next: (response) => {

        console.log("FULL RESPONSE", response);

        this.orders = response.orderDtos;

        this.totalOrders = response.size;

        this.totalPrice = response.price;

      },

      error: (error) => {

        console.log("ERROR", error);

      }

    });

  }

}