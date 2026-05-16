package com.spring.boot.resturantbackend.controllers;

import com.spring.boot.resturantbackend.dto.AdminContactMessageDto;
import com.spring.boot.resturantbackend.dto.ContactInfoDto;
import com.spring.boot.resturantbackend.models.ContactInfo;
import com.spring.boot.resturantbackend.services.ContactInfoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
@CrossOrigin("*")
public class ContactInfoController {

    @Autowired
    private ContactInfoService contactInfoService;

    @PostMapping
    public ContactInfoDto createContactInfo(
            @Valid @RequestBody ContactInfoDto contactInfoDto
    ) {

        return contactInfoService
                .createContactInfo(contactInfoDto);
    }

    @GetMapping("/admin/all")

    public List<AdminContactMessageDto> getAllMessages() {

        return contactInfoService.getAllMessages();

    }

    @PutMapping("/admin/reply/{id}")

    public ContactInfo replyMessage(
            @PathVariable Long id,
            @RequestBody String reply
    ) {

        return contactInfoService
                .replyMessage(id, reply);

    }

}