import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../service/auth.service";
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  notifications: any[] = [];
  constructor(
  private routes: Router,
  private authService: AuthService,
  private notificationService: NotificationService
) {

}

ngOnInit(): void {

  const userId = sessionStorage.getItem('id');

  console.log("USER ID =", userId);

  if(userId){

    this.notificationService
      .getNotifications(Number(userId))
      .subscribe({

        next: (res: any) => {

          console.log("NOTIFICATIONS =", res);

          this.notifications = res;

        },

        error: (err) => {

          console.log("NOTIFICATION ERROR =", err);

        }

      });

  }

}


  isUserLogin(): boolean {
    return this.authService.isUserLogin();
  }
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  search(key: any){
    this.routes.navigateByUrl("/products/" + key);
  }

  logOut(){
    this.authService.logOut();
    this.routes.navigateByUrl("/login");
  }

  isProductsPage(): boolean {
  return this.routes.url.includes('/products');
}
}
