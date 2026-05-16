package com.spring.boot.resturantbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserContactMessageDto {

    private Long id;

    private String subject;

    private String message;

    private String reply;

}