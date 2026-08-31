package com.spring.boot.resturantbackend.models.security;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ACCOUNT_DETAILS", schema = "hr")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AccountDetails {

@Id
@SequenceGenerator(
        name = "account_seq",
        sequenceName = "ACCOUNT_SEQ",
        allocationSize = 1
)
@GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "account_seq"
)
    private Long id;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "address", nullable = false)
    private String address;

    @OneToOne(mappedBy = "accountDetails")
    private Account account;
}
