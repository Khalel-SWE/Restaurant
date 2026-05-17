package com.spring.boot.resturantbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class OrderDto {

    private Long id;
    private String code;
    private double totalPrice;
    private double totalNumber;
    private String username;
    List<ProductDto> products;

}
