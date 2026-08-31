import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

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

  updateAccountDetails(data: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/update-details`,
      data,
      { responseType: 'text' as 'json' }
    );
  }

  getAllAccounts(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/admin/all-users`
    );
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/admin/delete-user/${id}`,
      {
        responseType: 'text' as 'json'
      }
    );
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${username}`);
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