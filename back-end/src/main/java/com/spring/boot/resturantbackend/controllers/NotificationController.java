package com.spring.boot.resturantbackend.controllers;

import com.spring.boot.resturantbackend.models.Notification;
import com.spring.boot.resturantbackend.repositories.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {

    @Autowired
    private NotificationRepo notificationRepo;

    @GetMapping("/{accountId}")
    public List<Notification> getNotifications(
            @PathVariable Long accountId
    ) {
        return notificationRepo
                .findByAccountIdOrderByCreatedAtDesc(accountId);
    }

    @GetMapping("/unread-count/{accountId}")
    public long getUnreadCount(
            @PathVariable Long accountId
    ) {
        return notificationRepo
                .countByAccountIdAndIsReadFalse(accountId);
    }

    @PutMapping("/mark-as-read/{accountId}")
    public void markAllAsRead(
            @PathVariable Long accountId
    ) {
        List<Notification> notifications =
                notificationRepo
                        .findByAccountIdOrderByCreatedAtDesc(accountId);

        for (Notification notification : notifications) {
            notification.setRead(true);
        }

        notificationRepo.saveAll(notifications);
        System.out.println("ALL NOTIFICATIONS MARKED AS READ");
    }

    // --- الدوال الجديدة للحذف ---

    @DeleteMapping("/delete/{id}")
    public void deleteNotification(@PathVariable Long id) {
        notificationRepo.deleteById(id);
        System.out.println("NOTIFICATION DELETED: " + id);
    }

    @DeleteMapping("/clear-all/{accountId}")
    public void clearAllNotifications(@PathVariable Long accountId) {
        notificationRepo.deleteByAccountId(accountId);
        System.out.println("ALL NOTIFICATIONS CLEARED FOR ACCOUNT: " + accountId);
    }
}