package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HostRequestDTO {
    private Integer id;
    private String fullName;
    private String email;
    private String phone;
    private String type;
    private String field1;
    private String field2;
    private String description;
    private String status;
    private String documentType;
    private String identityFileUrl;
    private String socialLink;
    private String introVideoUrl;

}
