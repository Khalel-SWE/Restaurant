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

        this.orders = response.orderDtos;

        this.totalOrders = response.size;

        this.totalPrice = response.price;

      },

      error: (error) => {

        console.log("ADMIN ERROR", error);

      }

    });

  }

}