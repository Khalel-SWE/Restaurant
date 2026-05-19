import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  id: any;

  username: string = '';

  email: string = '';

  phoneNumber: string = '';

  address: string = '';

  age: number = 0;

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const user = JSON.parse(
      sessionStorage.getItem('user') || '{}'
    );

    console.log("CURRENT USER", user);

    this.id = user.id;

    this.username = user.username;

    if (user.accountDetails) {

      this.email =
        user.accountDetails.email || '';

      this.phoneNumber =
        user.accountDetails.phoneNumber || '';

      this.address =
        user.accountDetails.address || '';

      this.age =
        user.accountDetails.age || 0;
    }
  }

  update() {

    const updateData = {

      id: this.id,

      username: this.username,

      accountDetails: {

        email: this.email,

        phoneNumber: this.phoneNumber,

        address: this.address,

        age: this.age
      }
    };

    console.log("Sending To Backend:", updateData);

    this.authService
      .updateAccountDetails(updateData)
      .subscribe({

        next: (response: any) => {

          console.log(
            "Backend Response:",
            response
          );

          const currentUser = JSON.parse(
            sessionStorage.getItem('user') || '{}'
          );

          currentUser.accountDetails =
            updateData.accountDetails;

          sessionStorage.setItem(
            'user',
            JSON.stringify(currentUser)
          );

          alert(
            "Profile Updated Successfully"
          );

          this.router.navigateByUrl('/products');
        },

        error: (error: any) => {

          console.error(
            "Update Error:",
            error
          );

          this.errorMessage =
            error?.error?.bundleMessage ||
            "حدث خطأ أثناء تحديث البيانات";

          alert(this.errorMessage);
        }

      });

  }

}