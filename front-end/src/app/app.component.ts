import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  toastMessage: string = '';
  toastType: string = '';

  constructor(
  private authService: AuthService,
  private router: Router
) {}

  ngOnInit(): void {

    window.addEventListener('show-toast', (event: any) => {

      this.showToast(
        event.detail.message,
        event.detail.type
      );

    });

  }

  isUserLogin(): boolean {

  return this.authService.isUserLogin();

}

  showCategoryBar(): boolean {

  return this.router.url.includes('/products')
      || this.router.url.includes('/category');

}

  showToast(
    message: string,
    type: string = 'success'
  ) {

    this.toastMessage = message;

    this.toastType = type;

    setTimeout(() => {

      this.toastMessage = '';

    }, 3000);

  }

}