import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: any[] = [];
  unreadCount: number = 0;

  constructor(
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.refreshUnreadCount();
  }

  // جلب عدد الإشعارات الغير مقروءة
  refreshUnreadCount() {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      this.notificationService
        .getUnreadCount(Number(userId))
        .subscribe((count: any) => {
          this.unreadCount = count;
        });
    }
  }

  // تحميل الإشعارات (بدون مسح العداد تلقائياً)
  loadNotifications() {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      this.notificationService
        .getNotifications(Number(userId))
        .subscribe((res: any) => {
          this.notifications = res;
        });
    }
  }

  // زر: قراءة الكل
  markAllAsRead(event: Event) {
    event.stopPropagation(); // لمنع إغلاق القائمة
    const userId = sessionStorage.getItem('id');
    if (userId && this.unreadCount > 0) {
      this.notificationService.markAllAsRead(Number(userId)).subscribe(() => {
        this.unreadCount = 0;
        this.loadNotifications(); // لتحديث شكل الإشعارات لو لزم الأمر
      });
    }
  }

  // زر: حذف إشعار واحد
  deleteNotification(event: Event, id: number) {
    event.stopPropagation(); // لمنع إغلاق القائمة
    this.notificationService.deleteNotification(id).subscribe(() => {
      // إزالة الإشعار من المصفوفة في الشاشة
      this.notifications = this.notifications.filter(n => n.id !== id);
      // تحديث العداد عشان لو كان غير مقروء واتحذف
      this.refreshUnreadCount();
    });
  }

  // زر: حذف الكل
  clearAllNotifications(event: Event) {
    event.stopPropagation(); // لمنع إغلاق القائمة
    const userId = sessionStorage.getItem('id');
    if (userId && this.notifications.length > 0) {
      if (confirm('Are you sure you want to delete all notifications?')) {
        this.notificationService.clearAllNotifications(Number(userId)).subscribe(() => {
          this.notifications = [];
          this.unreadCount = 0;
        });
      }
    }
  }
}