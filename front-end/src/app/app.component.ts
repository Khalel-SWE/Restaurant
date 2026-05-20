// import { Component } from '@angular/core';
// import { AuthService } from 'src/service/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })

// export class AppComponent {

//   showToast: boolean = false;

//   toastMessage: string = '';

//   toastType: string = 'success';

//   constructor(private authService: AuthService) {

//     // نخلي أي component يقدر ينده الـ toast
//     (window as any).showAppToast =
//       this.showAppToast.bind(this);
//   }

//   isUserLogin(): boolean {

//     return this.authService.isUserLogin();

//   }

//   showAppToast(
//     message: string,
//     type: string = 'success'
//   ) {

//     this.toastMessage = message;

//     this.toastType = type;

//     this.showToast = true;

//     setTimeout(() => {

//       this.showToast = false;

//     }, 3000);

//   }

// }
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  toastMessage: string = '';
  toastType: string = '';

  constructor(private authService: AuthService) {}

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