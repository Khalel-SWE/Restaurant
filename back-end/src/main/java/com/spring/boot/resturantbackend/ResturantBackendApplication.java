package com.spring.boot.resturantbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
@ConfigurationPropertiesScan
public class ResturantBackendApplication {

    public static void main(String[] args) {
        // to run the app from here
        SpringApplication.run(ResturantBackendApplication.class, args);
    }

}
