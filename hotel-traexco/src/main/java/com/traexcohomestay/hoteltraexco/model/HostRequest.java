package com.traexcohomestay.hoteltraexco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class HostRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String type; // house, service, experience
    private String field1; // name of homestay/experience/service
    private String field2; // extra (e.g. duration/type)
    private String description;
    private String documentType;
    private String identityFileUrl;
    private String socialLink;
    private String introVideoUrl;
    private Boolean emailVerified = false;
    private String verifyToken;


    private String status = "PENDING";
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}