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
}
