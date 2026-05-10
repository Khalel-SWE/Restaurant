package com.spring.boot.resturantbackend.dto.security;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AccountDto {

    private Long id;
    private String username;
    // ضيف دول هنا كمان عشان يستقبلهم من الأنجولار المفرود
    private String email;
    private String phoneNumber;
    private String address;
    private Integer age;
//    
    private boolean enabled;
    private List<RoleDto> roles;
    private AccountDetailsDto accountDetails;
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{7,}$",
            message = "error.password"
    )
    private String password;
}
