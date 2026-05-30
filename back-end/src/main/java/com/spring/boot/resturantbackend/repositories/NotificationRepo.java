package com.spring.boot.resturantbackend.repositories;

import com.spring.boot.resturantbackend.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Long> {

    List<Notification> findByAccountIdOrderByCreatedAtDesc(Long accountId);

    long countByAccountIdAndIsReadFalse(Long accountId);

    @Transactional
    void deleteByAccountId(Long accountId);
}