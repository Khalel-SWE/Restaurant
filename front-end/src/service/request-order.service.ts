import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RequestOrderService {

  // شيل السلاش اللي في الآخر هنا
  url = 'http://localhost:9090/orders'; 

  constructor(private http: HttpClient) { }

  createOrder(productsIds, totalPrice, totalNumber): Observable<any> {
    // ضيف السلاش هنا يدوي عشان تضمن إن الرابط يتجمع صح
    return this.http.post<any>(this.url + '/create-orders' , {productsIds, totalPrice, totalNumber}).pipe(
      map(response => response)
    );
  }
  
  // نفس الكلام هنا
  getOrder(): Observable<any> {
    return this.http.get<any>(this.url + '/all-orders').pipe(
      map(response => response)
    );
  }
}
