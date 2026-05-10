import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestOrderService {

  url = 'http://localhost:9090/orders';

  constructor(private http: HttpClient) { }

  createOrder(productsIds: any, totalPrice: any, totalNumber: any): Observable<any> {

    return this.http.post<any>(
      this.url + '/create-orders',
      {
        productsIds,
        totalPrice,
        totalNumber
      }
    );
  }

  getOrder(): Observable<any> {

    return this.http.get<any>(
      this.url + '/all-orders'
    );
  }
}