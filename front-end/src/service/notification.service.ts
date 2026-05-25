// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {

//   private apiUrl = 'http://localhost:9090/api/notifications';

//   constructor(private http: HttpClient) {}

//   getNotifications(userId: number): Observable<any> {

//     return this.http.get(
//       `${this.apiUrl}/${userId}`
//     );
//   }

//   getUnreadCount(userId: number): Observable<any> {

//     return this.http.get(
//       `${this.apiUrl}/unread-count/${userId}`
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:9090/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/${userId}`
    );
  }

  getUnreadCount(userId: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/unread-count/${userId}`
    );
  }

  markAllAsRead(userId: number): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/mark-as-read/${userId}`,
      {}
    );
  }
}