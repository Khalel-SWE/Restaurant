package com.spring.boot.resturantbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminContactMessageDto {

    private Long id;

    private String name;

    private String email;

    private String subject;

    private String message;

    private String reply;

    private String username;

}