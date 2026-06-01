package com.spring.boot.resturantbackend.models.security;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(schema = "hr")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Role {
@Id
@SequenceGenerator(
        name = "role_seq",
        sequenceName = "ROLE_SEQ",
        allocationSize = 1
)
@GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "role_seq"
)
    private Long id;
    @Column(nullable = false)
    private String role;
    @ManyToMany(mappedBy = "roles")
    private List<Account> accounts;
}
