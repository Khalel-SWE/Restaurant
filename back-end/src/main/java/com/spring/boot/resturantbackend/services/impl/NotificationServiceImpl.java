package com.spring.boot.resturantbackend.services.impl;

import com.spring.boot.resturantbackend.models.Notification;
import com.spring.boot.resturantbackend.models.security.Account;
import com.spring.boot.resturantbackend.repositories.NotificationRepo;
import com.spring.boot.resturantbackend.repositories.security.AccountRepo;
import com.spring.boot.resturantbackend.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private AccountRepo accountRepo;

    @Override
    public void createNotification(
            Long accountId,
            String message,
            String type
    ) {

        Account account = accountRepo
                .findById(accountId)
                .orElseThrow();

        Notification notification = new Notification();

        notification.setMessage(message);

        notification.setType(type);

        notification.setAccount(account);

        notification.setRead(false);

        notificationRepo.save(notification);

        System.out.println("NOTIFICATION SAVED SUCCESSFULLY");
    }
}