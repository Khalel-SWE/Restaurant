package com.spring.boot.resturantbackend.services;

import com.spring.boot.resturantbackend.dto.AdminContactMessageDto;
import com.spring.boot.resturantbackend.dto.ContactInfoDto;
import com.spring.boot.resturantbackend.dto.UserContactMessageDto;
import com.spring.boot.resturantbackend.models.ContactInfo;

import java.util.List;

public interface ContactInfoService {

    ContactInfoDto createContactInfo(ContactInfoDto contactInfoDto);

//    List<ContactInfo> getAllMessages();
    List<AdminContactMessageDto> getAllMessages();

    ContactInfo replyMessage(Long id, String reply);

    List<UserContactMessageDto> getMyMessages();

}