package com.spring.boot.resturantbackend.controllers.security;

import com.spring.boot.resturantbackend.controllers.vm.Security.AccountAuthRequestVm;
import com.spring.boot.resturantbackend.controllers.vm.Security.AccountAuthResponseVm;
import com.spring.boot.resturantbackend.dto.security.AccountDto;
import com.spring.boot.resturantbackend.services.security.AccountService;
import com.spring.boot.resturantbackend.services.security.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.SystemException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Tag(name = "Auth Controller", description = "Sign up, login")
@RestController
@RequestMapping("/auth")
// انوتيشن واحدة شاملة لكل الطرق والـ Headers ومسموحة للأنجولار
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AccountService accountService;

    @PostMapping("/sign-up")
    public ResponseEntity<AccountAuthResponseVm> signUp(@RequestBody @Valid AccountAuthRequestVm accountAuthRequestVm) throws SystemException {
        return ResponseEntity.created(URI.create("/sign-up")).body(authService.signUp(accountAuthRequestVm));
    }

    @PostMapping("/login")
    public ResponseEntity<AccountAuthResponseVm> login(@RequestBody @Valid AccountAuthRequestVm accountAuthRequestVm) throws SystemException {
        return ResponseEntity.ok(authService.login(accountAuthRequestVm));
    }


    @PutMapping("/update-details")
    public ResponseEntity<String> updateDetails(@RequestBody AccountDto accountDto) {
        System.out.println("INSIDE UPDATE ENDPOINT");
        return ResponseEntity.ok("WORKING");
    }
}