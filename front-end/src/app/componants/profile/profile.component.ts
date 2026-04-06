import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // بيانات الـ Form
  accountDetails = {
    age: '',
    email: '',
    phoneNumber: '',
    address: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  //update() {
    // إحنا محتاجين نبعت الـ ID بتاع اليوزر الحالي (ممكن نجيبه من التوكن أو نسيبه للباك إند)
    // للتبسيط، هنفترض إن الباك إند هيعرف اليوزر من الـ Security Context
  //  const dataToSend = {
  //     accountDetails: this.accountDetails
  //  };

  //  this.authService.updateAccountDetails(dataToSend).subscribe(
  //    res => {
  //      alert("تم تحديث بياناتك بنجاح! يمكنك الآن الطلب.");
  //      this.router.navigateByUrl("/card-details"); // نرجعه للسلة يكمل طلبه
  //    },
  //    err => alert("خطأ في التحديث")
  //  );
  //}

  update() {
  // 1. هنجيب الـ id اللي اتسيف لما اليوزر عمل Login
  // ملحوظة: تأكد إنك بتسيف الـ id في الـ sessionStorage وقت اللوجين
  const userId = sessionStorage.getItem("id"); 

  const dataToSend = {
    id: userId, // السطر ده هو "كلمة السر" عشان الربط ينجح
    accountDetails: this.accountDetails
  };

  this.authService.updateAccountDetails(dataToSend).subscribe(
    res => {
      alert("تم تحديث بياناتك بنجاح! يمكنك الآن الطلب.");
      this.router.navigateByUrl("/cardDetails");
    },
    err => {
      console.error(err);
      alert("حدث خطأ، تأكد من تسجيل الدخول أولاً");
    }
  );
}

}
