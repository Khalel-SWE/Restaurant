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
    // 1. نقرأ اليوزرنيم من الجلسة
    const sessionUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    
    this.id = sessionUser.id;
    this.username = sessionUser.username;

    // 2. لو اليوزرنيم موجود، نكلم الباك إند يجيب الداتا الطازة
    if (this.username) {
      this.authService.getUserByUsername(this.username).subscribe({
        next: (user: any) => {
          console.log("FRESH CURRENT USER FROM DB", user);
          
          if (user) {
            // نأكد على الـ ID واليوزرنيم
            this.id = user.id || this.id;
            this.username = user.username || this.username;

            // لو عنده بيانات تفصيلية، نملاها
            if (user.accountDetails) {
              this.email = user.accountDetails.email || '';
              this.phoneNumber = user.accountDetails.phoneNumber || '';
              this.address = user.accountDetails.address || '';
              this.age = user.accountDetails.age || 0;
            }
          }
        },
        error: (error: any) => {
          console.error("Error fetching user data from backend", error);
          
          // حل بديل لو حصل إيرور (نقرأ القديم من الجلسة)
          if (sessionUser.accountDetails) {
            this.email = sessionUser.accountDetails.email || '';
            this.phoneNumber = sessionUser.accountDetails.phoneNumber || '';
            this.address = sessionUser.accountDetails.address || '';
            this.age = sessionUser.accountDetails.age || 0;
          }
        }
      });
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

    this.authService.updateAccountDetails(updateData).subscribe({
      next: (response: any) => {
        console.log("Backend Response:", response);

        const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
        currentUser.accountDetails = updateData.accountDetails;
        sessionStorage.setItem('user', JSON.stringify(currentUser));

        window.dispatchEvent(
          new CustomEvent('show-toast', {
            detail: {
              message: 'Profile Updated Successfully',
              type: 'success'
            }
          })
        );

        this.router.navigateByUrl('/products');
      },
      error: (error: any) => {
        console.error("Update Error:", error);

        this.errorMessage =
          error?.error?.bundleMessage || "حدث خطأ أثناء تحديث البيانات";

        window.dispatchEvent(
          new CustomEvent('show-toast', {
            detail: {
              message: this.errorMessage,
              type: 'error'
            }
          })
        );
      }
    });
  }
}