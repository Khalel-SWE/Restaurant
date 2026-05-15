package com.spring.boot.resturantbackend.controllers;

import com.spring.boot.resturantbackend.dto.ContactInfoDto;
import com.spring.boot.resturantbackend.services.ContactInfoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}