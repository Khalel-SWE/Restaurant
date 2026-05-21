import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {

  notifications: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {

    const userId = sessionStorage.getItem('id');

    console.log("NOTIFICATION USER ID =", userId);

    if (!userId) {
      return;
    }

    this.http.get(`http://localhost:9090/api/notifications/${userId}`)
      .subscribe({

        next: (res: any) => {

          console.log("NOTIFICATIONS =", res);

          this.notifications = res;
        },

        error: (err: any) => {

          console.log("FULL NOTIFICATION ERROR =", err);

          console.log("STATUS =", err.status);

          console.log("MESSAGE =", err.message);

          console.log("ERROR BODY =", err.error);

        }

      });
  }
}