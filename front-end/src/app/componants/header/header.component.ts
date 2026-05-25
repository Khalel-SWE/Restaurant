import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../service/auth.service";
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  notifications: any[] = [];

  unreadCount: number = 0;

  constructor(
    private routes: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {

    const userId = sessionStorage.getItem('id');

    console.log("USER ID =", userId);

    if (userId) {

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
      .markAllAsRead(Number(userId))
      .subscribe(() => {

        this.unreadCount = 0;

        this.notificationService
          .getNotifications(Number(userId))
          .subscribe((res: any) => {

            console.log("NOTIFICATIONS =", res);

            this.notifications = res;

          });

      });

  }
}

  isUserLogin(): boolean {
    return this.authService.isUserLogin();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  search(key: any) {
    this.routes.navigateByUrl("/products/" + key);
  }

  logOut() {
    this.authService.logOut();
    this.routes.navigateByUrl("/login");
  }

  isProductsPage(): boolean {
    return this.routes.url.includes('/products');
  }

  isLoginPage(): boolean {

  return this.routes.url.includes('/login');

}

isSignupPage(): boolean {

  return this.routes.url.includes('/signup');

}
}