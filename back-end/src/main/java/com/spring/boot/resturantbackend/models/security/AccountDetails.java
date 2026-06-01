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

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    // int not String
    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "phone_number", nullable = false) // استخدام underscore ليتناسب مع naming convention الخاص بأوراكل
    private String phoneNumber;

    @Column(name = "address", nullable = false)
    private String address;

    // mappedBy تشير إلى اسم المتغير 'accountDetails' الموجود في كلاس Account
    @OneToOne(mappedBy = "accountDetails")
    private Account account;
}
