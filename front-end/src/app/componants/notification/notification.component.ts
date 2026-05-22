import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: any[] = [];

  unreadCount: number = 0;

  constructor(
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    const userId = sessionStorage.getItem('id');

    console.log("USER ID =", userId);

    if (userId) {

      // unread count
      this.notificationService
        .getUnreadCount(Number(userId))
        .subscribe((count: any) => {

          console.log("UNREAD COUNT =", count);

          this.unreadCount = count;
        });

    }
  }

  loadNotifications() {

    const userId = sessionStorage.getItem('id');

    if (userId) {

      this.notificationService
        .getNotifications(Number(userId))
        .subscribe((res: any) => {

          console.log("NOTIFICATIONS =", res);

          this.notifications = res;

          // لما يفتح الجرس
          // نخفي العداد
          this.unreadCount = 0;

        });

    }
  }
}