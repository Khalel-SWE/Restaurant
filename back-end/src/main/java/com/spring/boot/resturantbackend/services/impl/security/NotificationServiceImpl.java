package com.spring.boot.resturantbackend.services.impl;

import com.spring.boot.resturantbackend.models.Notification;
import com.spring.boot.resturantbackend.models.security.Account;
import com.spring.boot.resturantbackend.repositories.NotificationRepo;
import com.spring.boot.resturantbackend.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepo notificationRepo;

    @Override
    public void createNotification(Long accountId, String message) {

        Notification notification = new Notification();

        notification.setMessage(message);

        Account account = new Account();
        account.setId(accountId);

        notification.setAccount(account);

        notificationRepo.save(notification);
    }
}