package com.spring.boot.resturantbackend.controllers.vm;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseOrderVm {
    private String code;
    private Double totalPrice;
    private Double totalNumber;
    public String message;

    public ResponseOrderVm(String message) {
        this.message = message;
    }

}
