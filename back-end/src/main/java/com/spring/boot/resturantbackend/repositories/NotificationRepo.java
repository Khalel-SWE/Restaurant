package com.spring.boot.resturantbackend.repositories;

import com.spring.boot.resturantbackend.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Long> {

    List<Notification> findByAccountIdOrderByCreatedAtDesc(Long accountId);

}