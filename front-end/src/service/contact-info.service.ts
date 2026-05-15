import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactInfoService {

  private baseUrl = "http://localhost:9090/contact";

  constructor(private http: HttpClient) { }

  sendMessage(data: any): Observable<any> {

    return this.http.post(
      this.baseUrl,
      data,
      { responseType: 'text' as 'json' }
    );

  }

}