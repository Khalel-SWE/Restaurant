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

  constructor(
    private requestOrderService: RequestOrderService
  ) { }

  ngOnInit(): void {

    this.requestOrderService
      .getAllOrdersForAdmin()
      .subscribe({

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

  updateStatus(orderId: number, newStatus: string) {

    const order = this.orders.find(
      o => o.id === orderId
    );

    if (!order) {

      return;

    }

    // ممنوع التعديل بعد النهاية
    if (
      order.status === 'DELIVERED' ||
      order.status === 'CANCELLED'
    ) {

      alert("Final status cannot be changed");

      return;

    }

    this.requestOrderService
      .updateOrderStatus(orderId, newStatus)
      .subscribe({

        next: () => {

          console.log("STATUS UPDATED");

          order.status = newStatus;

        },

        error: (error) => {

          console.log(error);

        }

      });

  }

  getStatusClass(status: string) {

    switch(status) {

      case 'PENDING':
        return 'bg-warning text-dark';

      case 'PREPARING':
        return 'bg-info text-dark';

      case 'ON_THE_WAY':
        return 'bg-primary text-white';

      case 'DELIVERED':
        return 'bg-success text-white';

      case 'CANCELLED':
        return 'bg-danger text-white';

      default:
        return 'bg-secondary text-white';

    }

  }

}