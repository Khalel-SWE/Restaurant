package com.spring.boot.resturantbackend.repositories;

import com.spring.boot.resturantbackend.models.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactInfoRepo extends JpaRepository<ContactInfo, Long> {

    List<ContactInfo> findAllByOrderByIdDesc();

    List<ContactInfo> findByAccountId(Long accountId);

    @Query("""
SELECT c.account.id
FROM ContactInfo c
WHERE c.id = :messageId
""")
    Long findAccountIdByMessageId(Long messageId);
}