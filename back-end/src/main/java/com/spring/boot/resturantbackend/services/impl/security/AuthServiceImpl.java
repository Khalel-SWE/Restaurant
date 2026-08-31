package com.spring.boot.resturantbackend.services.impl.security;

import com.spring.boot.resturantbackend.config.security.TokenHandler;
import com.spring.boot.resturantbackend.controllers.vm.Security.AccountAuthRequestVm;
import com.spring.boot.resturantbackend.controllers.vm.Security.AccountAuthResponseVm;
import com.spring.boot.resturantbackend.dto.security.AccountDto;
import com.spring.boot.resturantbackend.mappers.security.AccountMapper;
import com.spring.boot.resturantbackend.models.security.Role;
import com.spring.boot.resturantbackend.repositories.security.RoleRepo;
import com.spring.boot.resturantbackend.services.security.AccountService;
import com.spring.boot.resturantbackend.services.security.AuthService;
import jakarta.transaction.SystemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@CrossOrigin(origins = "http://localhost:4200")
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AccountService accountService;
    @Autowired
    private TokenHandler tokenHandler;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepo roleRepo;

    @Override
    public AccountAuthResponseVm signUp(AccountAuthRequestVm accountAuthRequestVm) {

        AccountDto accountDto =
                AccountMapper.ACCOUNT_MAPPER
                        .toAccountDto(accountAuthRequestVm);

        accountDto.setEnabled(true);

        Role userRole = roleRepo
                .findByRole("USER")
                .orElseThrow(() ->
                        new RuntimeException("USER ROLE NOT FOUND")
                );

        com.spring.boot.resturantbackend.dto.security.RoleDto roleDto =
                new com.spring.boot.resturantbackend.dto.security.RoleDto();

        roleDto.setId(userRole.getId());
        roleDto.setRole(userRole.getRole());

        accountDto.setRoles(
                java.util.List.of(roleDto)
        );

        accountDto =
                accountService.createAccount(accountDto);

        AccountAuthResponseVm responseVm =
                AccountMapper.ACCOUNT_MAPPER
                        .toAccountResponseVm(accountDto);

        responseVm.setToken(
                tokenHandler.generateToken(accountDto)
        );

        responseVm.setUserRoles(
                getAccountRoles(accountDto)
        );

        return responseVm;
    }

    @Override
    public AccountAuthResponseVm login(AccountAuthRequestVm accountAuthRequestVm) {
        try {
            AccountDto accountDto = accountService.getAccountByUsername(accountAuthRequestVm.getUsername());

            if (Objects.isNull(accountDto)) {
                throw new SystemException("not_found.account");
            }

            if (!accountDto.isEnabled()) {
                throw new SystemException("account.disabled");
            }

            if (!passwordEncoder.matches(accountAuthRequestVm.getPassword(), accountDto.getPassword())) {
                throw new SystemException("error.invalid.credentials");
            }
            AccountAuthResponseVm accountAuthResponseVm = AccountMapper.ACCOUNT_MAPPER.toAccountResponseVm(accountDto);
            accountAuthResponseVm.setToken(tokenHandler.generateToken(accountDto));
            accountAuthResponseVm.setUserRoles(getAccountRoles(accountDto));
            return accountAuthResponseVm;
        } catch (SystemException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private List<String> getAccountRoles(AccountDto accountDto) {
        return accountDto.getRoles().stream().map(roleDto -> roleDto.getRole()).collect(Collectors.toList());
    }
}
