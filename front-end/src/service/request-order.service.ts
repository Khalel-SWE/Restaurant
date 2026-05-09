// import { Injectable } from '@angular/core';
// // import {HttpClient} from "@angular/common/http";
// import {Observable} from "rxjs";
// import {map} from "rxjs/operators";
// import { HttpClient, HttpHeaders } from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
// export class RequestOrderService {

//   // شيل السلاش اللي في الآخر هنا
//   url = 'http://localhost:9090/orders'; 

//   constructor(private http: HttpClient) { }

//    private getHeaders(): HttpHeaders {
//     const token = sessionStorage.getItem('token'); // أو localStorage حسب ما انت مخزن فين
//     let headers = new HttpHeaders();
//     if (token) {
//       headers = headers.set('Authorization', 'Bearer ' + token);
//     }
//     return headers;
//   }

//   // createOrder( totalPrice, totalNumber, productsIds): Observable<any> {
//   //   // ضيف السلاش هنا يدوي عشان تضمن إن الرابط يتجمع صح
    
//   //   return this.http.post<any>(this.url + '/create-orders' , {totalPrice, totalNumber, productsIds}).pipe(
//   //     map(response => response)
//   //   );
//   // }

//   createOrder(productsIds: any, totalPrice: any, totalNumber: any): Observable<any> {
//   return this.http.post<any>(
//     this.url + '/create-orders',  //  مهم جداً
//     { productsIds, totalPrice, totalNumber },
//     { headers: this.getHeaders() }
//   );
// }
  
//   // نفس الكلام هنا
//   getOrder(): Observable<any> {
//     return this.http.get<any>(this.url + '/all-orders').pipe(
//       map(response => response)
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // جلب بيانات اليوزر كاملة من السيشن
    const userStr = sessionStorage.getItem("user");
    
    if (userStr) {
      const user = JSON.parse(userStr);
      const token = user.token; // هنا بنجيب التوكن من جوه الأوبجكت

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}