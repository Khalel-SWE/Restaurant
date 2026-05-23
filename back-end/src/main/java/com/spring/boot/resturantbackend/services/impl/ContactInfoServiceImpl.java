package com.spring.boot.resturantbackend.services.impl;

import com.spring.boot.resturantbackend.dto.AdminContactMessageDto;
import com.spring.boot.resturantbackend.dto.ContactInfoDto;
import com.spring.boot.resturantbackend.dto.UserContactMessageDto;
import com.spring.boot.resturantbackend.models.ContactInfo;
import com.spring.boot.resturantbackend.models.security.Account;
import com.spring.boot.resturantbackend.repositories.ContactInfoRepo;
import com.spring.boot.resturantbackend.services.ContactInfoService;
import com.spring.boot.resturantbackend.services.NotificationService;
import com.spring.boot.resturantbackend.services.security.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactInfoServiceImpl implements ContactInfoService {

    @Autowired
    private ContactInfoRepo contactInfoRepo;

    @Autowired
    private AccountService accountService;

    @Autowired
    private NotificationService notificationService;

    @Override
    public ContactInfoDto createContactInfo(ContactInfoDto contactInfoDto) {

        Account account =
                accountService.getCurrentAccount();

        ContactInfo contactInfo = new ContactInfo();

        contactInfo.setName(contactInfoDto.getName());
        contactInfo.setEmail(contactInfoDto.getEmail());
        contactInfo.setSubject(contactInfoDto.getSubject());
        contactInfo.setMessage(contactInfoDto.getMessage());

        contactInfo.setReply("No reply yet");

        contactInfo.setAccount(account);

        ContactInfo saved =
                contactInfoRepo.save(contactInfo);

        notificationService.createNotification(
                1L,
                "New contact message received",
                "NEW_CONTACT_MESSAGE"
        );

        contactInfoDto.setId(saved.getId());

        return contactInfoDto;
    }

    @Override
    public List<AdminContactMessageDto> getAllMessages() {

        List<ContactInfo> messages =
                contactInfoRepo.findAllByOrderByIdDesc();

        return messages.stream().map(message -> {

            AdminContactMessageDto dto =
                    new AdminContactMessageDto();

            dto.setId(message.getId());

            dto.setName(message.getName());

            dto.setEmail(message.getEmail());

            dto.setSubject(message.getSubject());

            dto.setMessage(message.getMessage());

            dto.setReply(message.getReply());

            if (message.getAccount() != null) {

                dto.setUsername(
                        message.getAccount().getUsername()
                );

            }

            return dto;

        }).toList();

    }

    @Override
    public ContactInfo replyMessage(Long id, String reply) {

        ContactInfo message =
                contactInfoRepo.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Message not found"));

        message.setReply(reply);

        System.out.println("REPLY METHOD STARTED");

        Long accountId =
                contactInfoRepo.findAccountIdByMessageId(id);

        System.out.println("ACCOUNT ID = " + accountId);

        if (accountId != null) {

            notificationService.createNotification(
                    accountId,
                    "Admin replied to your message",
                    "CONTACT_REPLY"
            );

        } else {

            System.out.println("ACCOUNT IS NULL");

        }

        return contactInfoRepo.save(message);

    }

    @Override
    public List<UserContactMessageDto> getMyMessages() {

        Account account =
                accountService.getCurrentAccount();

        List<ContactInfo> messages =
                contactInfoRepo.findByAccountId(account.getId());

        return messages.stream().map(message -> {

            UserContactMessageDto dto =
                    new UserContactMessageDto();

            dto.setId(message.getId());

            dto.setSubject(message.getSubject());

            dto.setMessage(message.getMessage());

            dto.setReply(message.getReply());

            return dto;

        }).toList();

    }
}