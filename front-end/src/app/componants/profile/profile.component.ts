import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // بيانات الـ Form اللي مربوطة بـ [(ngModel)] في الـ HTML
  accountDetails = {
    age: null,
    phoneNumber: '',
    email: '',
    address: ''
  };

  // إحنا هنا معرفين authService فقط في الـ constructor
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // اختياري: لو عاوز تملا البيانات القديمة أول ما الصفحة تفتح
    const currentAccount = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (currentAccount.accountDetails) {
      this.accountDetails = currentAccount.accountDetails;
    }
  }

  update() {
    // 1. بنجيب بيانات الأكونت الحالي من الـ sessionStorage عشان نحصل على الـ ID
    const currentAccount = JSON.parse(sessionStorage.getItem('user') || '{}');

    // 2. بنجهز الكائن اللي هيبعت للباك إند (لازم يحتوي على الـ ID)
    const updatedData = {
      id: currentAccount.id, 
      username: currentAccount.username,
      accountDetails: this.accountDetails
    };

    // 3. بننادي على authService (لأن هو ده اللي موجود في الـ constructor فوق)
    this.authService.updateAccountDetails(updatedData).subscribe(
      res => {
        alert("✅ تم تحديث بياناتك بنجاح! يمكنك الآن إتمام طلباتك.");
        // بنحدث بيانات المستخدم في الكاش عشان الـ ID بتاع الـ Details يتسيف
        sessionStorage.setItem('user', JSON.stringify(res));
        // نرجعه لصفحة الكارت يكمل الطلب اللي كان بيحاول يعمله
        this.router.navigateByUrl("/card-details");
      },
      err => {
        console.error("Update error:", err);
        alert("❌ حدث خطأ أثناء التحديث، تأكد من إدخال البيانات بشكل صحيح.");
      }
    );
  }
}