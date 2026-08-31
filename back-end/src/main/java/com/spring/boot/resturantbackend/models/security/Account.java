package com.spring.boot.resturantbackend.models.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.boot.resturantbackend.models.ContactInfo;
import com.spring.boot.resturantbackend.models.Notification;
import com.spring.boot.resturantbackend.models.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ACCOUNTS", schema = "hr")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Account {

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

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Boolean enabled;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "account_details_id", referencedColumnName = "id")
    private AccountDetails accountDetails;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            schema = "hr",
            name = "ACCOUNT_ROLES",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"account_id", "role_id"})
    )
    private List<Role> roles = new ArrayList<>();

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ContactInfo> contacts;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Order> orders;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Notification> notifications;

}
