//package com.spring.boot.resturantbackend.models;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.List;
//
//@Entity
//@Table(name = "product", schema = "hr")
//@AllArgsConstructor
//@NoArgsConstructor
//@Setter
//@Getter
//public class Product {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @Column(nullable = false)
//    private String name;
//    @Column(nullable = false)
//    private String imagePath;
//    @Column(nullable = false, length = 1000)
//    private String description;
//    @Column(nullable = false)
//    private Double price;
//    @ManyToOne(fetch = FetchType.LAZY)
//    private Category category;
//    @ManyToMany(mappedBy = "products")
//    private List<Order> orders;
//}

package com.spring.boot.resturantbackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "PRODUCT", schema = "HR")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "image_path", nullable = false)
    private String imagePath;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private Double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;

    @ManyToMany(mappedBy = "products")
    private List<Order> orders;
}


