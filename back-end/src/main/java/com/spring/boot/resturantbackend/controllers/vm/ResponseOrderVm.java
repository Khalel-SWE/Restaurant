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
//    private Long id;
//    @NotEmpty(message = "error.user_id.not_empty")
//    private Long userId;
//    @NotNull(message = "error.code.not_empty")
    private String code;
//    @NotNull(message = "error.total_price.not_empty")
    private Double totalPrice;
//    @NotNull(message = "error.total_number.not_empty")
    private Double totalNumber;
    public String message;

    public ResponseOrderVm(String message) {
        this.message = message;
    }

//    public ResponseOrderVm(String code, Double totalPrice, Double totalNumber) {
//        this.code = code;
//        this.totalPrice = totalPrice;
//        this.totalNumber = totalNumber;
//    }
}
