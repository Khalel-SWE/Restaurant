package com.spring.boot.resturantbackend.services;

public interface NotificationService {

    void createNotification(
            Long accountId,
            String message,
            String type
    );
}