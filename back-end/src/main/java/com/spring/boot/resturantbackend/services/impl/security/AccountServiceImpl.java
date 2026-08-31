package com.spring.boot.resturantbackend.services.impl.security;

import com.spring.boot.resturantbackend.dto.security.AccountDto;
import com.spring.boot.resturantbackend.mappers.security.AccountMapper;
import com.spring.boot.resturantbackend.models.security.Account;
import com.spring.boot.resturantbackend.models.security.AccountDetails;
import com.spring.boot.resturantbackend.repositories.security.AccountRepo;
import com.spring.boot.resturantbackend.services.security.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<AccountDto> getAccounts() {
        List<Account> users = accountRepo.findAll();
        return users.stream()
                .map(AccountMapper.ACCOUNT_MAPPER::toAccountDto)
                .collect(Collectors.toList());
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        accountDto.setEnabled(true);
        Account user = AccountMapper.ACCOUNT_MAPPER.toAccount(accountDto);
        user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        user = accountRepo.save(user);
        return AccountMapper.ACCOUNT_MAPPER.toAccountDto(user);
    }

    @Override
    public AccountDto updateAccount(AccountDto accountDto) {
        Account account = AccountMapper.ACCOUNT_MAPPER.toAccount(accountDto);
        account = accountRepo.save(account);
        return AccountMapper.ACCOUNT_MAPPER.toAccountDto(account);
    }

    @Override
    public AccountDto updateAccountDetails(AccountDto accountDto) {

        Account existingAccount = accountRepo.findById(accountDto.getId())
                .orElseThrow(() -> new RuntimeException("Account not found"));


        AccountDetails details = existingAccount.getAccountDetails();
        if (details == null) {
            details = new AccountDetails();
            details.setAccount(existingAccount);
            existingAccount.setAccountDetails(details);
        }

        String address = (accountDto.getAccountDetails() != null) ? accountDto.getAccountDetails().getAddress() : null;
        String email = (accountDto.getAccountDetails() != null) ? accountDto.getAccountDetails().getEmail() : null;
        String phone = (accountDto.getAccountDetails() != null) ? accountDto.getAccountDetails().getPhoneNumber() : null;
        Integer age = (accountDto.getAccountDetails() != null) ? accountDto.getAccountDetails().getAge() : 0;

        details.setAddress(address);
        details.setEmail(email);
        details.setPhoneNumber(phone);
        details.setAge(age);

        accountRepo.save(existingAccount);
        return AccountMapper.ACCOUNT_MAPPER.toAccountDto(existingAccount);
    }

    @Override
    public void deleteAccount(Long id) {
        accountRepo.deleteById(id);
    }

    @Override
    public AccountDto getAccountById(Long id) {
        Account account = accountRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));
        return AccountMapper.ACCOUNT_MAPPER.toAccountDto(account);
    }

    @Override
    public AccountDto getAccountByUsername(String username) {
        Optional<Account> result = accountRepo.findByUsername(username);
        return result.map(AccountMapper.ACCOUNT_MAPPER::toAccountDto).orElse(null);
    }

    @Override
    public Account getCurrentAccount() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null) {
            return null;
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof AccountDto accountDto) {

            return accountRepo
                    .findByUsername(accountDto.getUsername())
                    .orElse(null);

        }

        return null;
    }
}