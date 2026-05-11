// import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {Observable} from "rxjs";
// import {map} from "rxjs/operators";

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private baseUrl = 'http://localhost:9090/auth';  // login   signup
//   constructor(private http: HttpClient) {
//   }


//   createAccount(username: any, password: any): Observable<any> {
//     return this.http.post<any>(this.baseUrl + "/sign-up", {username, password}).pipe(
//       map(
//         response => response
//       )
//     )
//   }

//   login(username: any, password: any): Observable<any> {
//     return this.http.post<any>(this.baseUrl + "/login", {username, password}).pipe(
//       map(
//         response => response
//       )
//     )
//   }

//   isUserLogin(): boolean {
//     return sessionStorage.getItem("token") != null &&
//                      sessionStorage.getItem("token") != undefined;
//   }

//   isAdmin(): boolean {
//     const roles = sessionStorage.getItem("roles");
//     if (!roles) {
//       return false;
//     }
//     return roles.includes("ADMIN");
//   }

//   logOut() {
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("roles");
//   }

//   // updateAccountDetails(accountDto: any): Observable<any> {
//   // return this.http.put<any>(`http://localhost:9090/update-details`, accountDto);
//   // }

//   updateAccountDetails(accountDto: any): Observable<any> {
//   // شيلنا كلمة auth خالص لأنها موجودة جوه الـ baseUrl
//   return this.http.put(`${this.baseUrl}/update-details`, accountDto);
// }

// }


import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:9090/auth';

  constructor(private http: HttpClient) {}

  createAccount(username: any, password: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/sign-up`,
      { username, password }
    );
  }

  login(username: any, password: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/login`,
      { username, password }
    );
  }

  // updateAccountDetails(accountDto: any): Observable<any> {

  //   return this.http.put(
  //     `${this.baseUrl}/update-details`,
  //     accountDto
  //   );
  // }

  updateAccountDetails(data: any): Observable<any> {
  return this.http.put(
    `${this.baseUrl}/update-details`,
     data,
      { responseType: 'text' as 'json' });
}

  isUserLogin(): boolean {
    return sessionStorage.getItem("token") != null;
  }

  isAdmin(): boolean {

    const roles = sessionStorage.getItem("roles");

    if (!roles) {
      return false;
    }

    return roles.includes("ADMIN");
  }

  logOut() {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("id");
  }
}