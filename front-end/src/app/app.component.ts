
// import { Component } from '@angular/core';
// import { AuthService } from 'src/service/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
  
//   constructor(private authService: AuthService) {}

//   // الميثود دي ضرورية عشان الـ HTML اللي بعته شغال بيها
//   isUserLogin(): boolean {
//     return this.authService.isUserLogin();
//   }
// }

import { Component } from '@angular/core';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  showToast: boolean = false;

  toastMessage: string = '';

  toastType: string = 'success';

  constructor(private authService: AuthService) {

    // نخلي أي component يقدر ينده الـ toast
    (window as any).showAppToast =
      this.showAppToast.bind(this);
  }

  isUserLogin(): boolean {

    return this.authService.isUserLogin();

  }

  showAppToast(
    message: string,
    type: string = 'success'
  ) {

    this.toastMessage = message;

    this.toastType = type;

    this.showToast = true;

    setTimeout(() => {

      this.showToast = false;

    }, 3000);

  }

}