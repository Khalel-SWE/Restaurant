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
  
  // ضيف السطر ده عشان الإيرور يختفي
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {

  this.authService.getCurrentUser().subscribe({

    next: (response: any) => {

      console.log("CURRENT USER", response);

      this.id = response.id;

      this.username = response.username;

      if (response.accountDetails) {

        this.email =
          response.accountDetails.email || '';

        this.phoneNumber =
          response.accountDetails.phoneNumber || '';

        this.address =
          response.accountDetails.address || '';

        this.age =
          response.accountDetails.age || 0;
      }

    },

    error: (error) => {

      console.log(error);

    }

  });

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

  this.authService.updateAccountDetails(updateData).subscribe(

    response => {

      console.log("Backend Response:", response);

      // نجيب اليوزر القديم كامل
      const currentUser = JSON.parse(
        sessionStorage.getItem('user') || '{}'
      );

      // نحدث فقط accountDetails
      currentUser.accountDetails = updateData.accountDetails;

      // نحفظه تاني مع الحفاظ على التوكن
      sessionStorage.setItem(
        'user',
        JSON.stringify(currentUser)
      );

      alert("Profile Updated Successfully");

      this.router.navigateByUrl('/products');

    },

    error => {

      console.error("Update Error:", error);

      this.errorMessage =
        error?.error?.bundleMessage ||
        "حدث خطأ أثناء تحديث البيانات";

      alert(this.errorMessage);

    }

  );
}
}