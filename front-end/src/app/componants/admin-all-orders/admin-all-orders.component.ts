import { Component, OnInit } from '@angular/core';
import { RequestOrderService } from "../../../service/request-order.service";

@Component({
  selector: 'app-admin-all-orders',
  templateUrl: './admin-all-orders.component.html',
  styleUrls: ['./admin-all-orders.component.css']
})
export class AdminAllOrdersComponent implements OnInit {

  orders: any[] = [];

  totalOrders: number = 0;

  totalPrice: number = 0;

  constructor(private requestOrderService: RequestOrderService) { }

  ngOnInit(): void {

    this.requestOrderService.getAllOrdersForAdmin().subscribe({

      next: (response) => {

  console.log("ADMIN ORDERS", response);

  this.orders = response;

  this.totalOrders = response.length;

  this.totalPrice = response.reduce(
    (sum: number, order: any) =>
      sum + order.totalPrice,
    0
  );

},

      error: (error) => {

        console.log("ADMIN ERROR", error);

      }

    });

  }

  updateStatus(orderId: number, event: any) {

  const status = event.target.value;

  this.requestOrderService
    .updateOrderStatus(orderId, status)
    .subscribe({

      next: () => {

        console.log("STATUS UPDATED");

      },

      error: (error) => {

        console.log(error);

      }

    });

}

}