package com.spring.boot.resturantbackend.controllers.security;

import com.spring.boot.resturantbackend.controllers.vm.Security.AccountAuthRequestVm;
import com.spring.boot.resturantbackend.controllers.vm.Security.AccountAuthResponseVm;
import com.spring.boot.resturantbackend.dto.security.AccountDto;
import com.spring.boot.resturantbackend.mappers.security.AccountMapper;
import com.spring.boot.resturantbackend.models.security.Account;
import com.spring.boot.resturantbackend.services.security.AccountService;
import com.spring.boot.resturantbackend.services.security.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.SystemException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@Tag(name = "Auth Controller", description = "Sign up, login")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AccountService accountService;

    @PostMapping("/sign-up")
    public ResponseEntity<AccountAuthResponseVm> signUp(
            @RequestBody @Valid AccountAuthRequestVm accountAuthRequestVm
    ) throws SystemException {

        return ResponseEntity
                .created(URI.create("/sign-up"))
                .body(authService.signUp(accountAuthRequestVm));
    }

    @PostMapping("/login")
    public ResponseEntity<AccountAuthResponseVm> login(
            @RequestBody @Valid AccountAuthRequestVm accountAuthRequestVm
    ) throws SystemException {

        return ResponseEntity.ok(
                authService.login(accountAuthRequestVm)
        );
    }

    @PutMapping("/update-details")
    public ResponseEntity<String> updateDetails(
            @RequestBody AccountDto accountDto
    ) {

        System.out.println("INSIDE UPDATE ENDPOINT");

        accountService.updateAccountDetails(accountDto);

        return ResponseEntity.ok("WORKING");
    }

    @GetMapping("/admin/all-users")
    public ResponseEntity<List<AccountDto>> getAllUsers() {

        return ResponseEntity.ok(
                accountService.getAccounts()
        );
    }

    @DeleteMapping("/admin/delete-user/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id
    ) {

        accountService.deleteAccount(id);

        return ResponseEntity.ok("USER DELETED");
    }

    @GetMapping("/me")
    public ResponseEntity<AccountDto> getCurrentUser() {

        Account account = accountService.getCurrentAccount();

        if (account == null) {
            return ResponseEntity.ok(null);
        }

        AccountDto accountDto =
                AccountMapper.ACCOUNT_MAPPER
                        .toAccountDto(account);

        return ResponseEntity.ok(accountDto);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<AccountDto> getUserByUsername(@PathVariable String username) {
        AccountDto accountDto = accountService.getAccountByUsername(username);
        return ResponseEntity.ok(accountDto);
    }
}
