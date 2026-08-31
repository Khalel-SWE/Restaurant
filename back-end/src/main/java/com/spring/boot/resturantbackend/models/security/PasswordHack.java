package com.spring.boot.resturantbackend.models.security;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordHack {

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostConstruct
    public void printPassword() {
        System.out.println(passwordEncoder.encode("Admin@1234"));
        System.out.println(passwordEncoder.encode("User@1234"));
    }
}
