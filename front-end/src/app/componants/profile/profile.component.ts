import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
// export class ProfileComponent implements OnInit {

//   // تعريف المتغيرات مفرودة لحل أخطاء الـ Build في الـ HTML
//   id: any;
//   username: string = '';
//   email: string = '';
//   phoneNumber: string = '';
//   address: string = '';
//   age: number = 0;

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
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.id = user.id;
      this.username = user.username;

      // فك الكائن القادم من السيشن وتوزيعه على المتغيرات المفرودة
      if (user.accountDetails) {
        this.email = user.accountDetails.email || '';
        this.phoneNumber = user.accountDetails.phoneNumber || '';
        this.address = user.accountDetails.address || '';
        this.age = user.accountDetails.age || 0;
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

//   update() {
//     // تجميع الحقول المفرودة في كائن واحد لإرساله للباك إند
//     const updateData = {
//       id: this.id,
//       username: this.username,
//       accountDetails: {
//         email: this.email,
//         phoneNumber: this.phoneNumber,
//         address: this.address,
//         age: this.age
//       }
//     };

//     console.log("Sending to Backend:", updateData);

//     this.authService.updateAccountDetails(updateData).subscribe(
//       response => {
//         // تحديث السيشن مع الحفاظ على التوكن
//         const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
//         const updatedUser = { 
//           ...currentUser, 
//           accountDetails: updateData.accountDetails 
//         };
//         sessionStorage.setItem('user', JSON.stringify(updatedUser));
        
//         alert("Success: Profile Updated!");
        
//         // الانتقال للمنتجات وعمل ريفريش للتأكد من زوال الـ 403
//         this.router.navigateByUrl('/products').then(() => {
//           window.location.reload();
//         });
//       },
//       // error => {
//       //   console.error("Update error:", error);
//       //   alert("Failed to update profile. Check console for details.");
//       // }
//       error => {
//     console.error("Error loading products", error);
//     // استخدم الـ Optional Chaining (?.) عشان الكود ميقفش لو الرسالة مش موجودة
//     this.errorMessage = error?.error?.bundleMessage || "حدث خطأ في الصلاحيات (403)";
// }
//     );
//   }


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