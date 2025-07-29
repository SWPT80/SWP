package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class ServiceDTO {
    private Integer id;
    private Integer homestayId;
    private Integer typeId;
    private BigDecimal price;
    private String specialNotes;
    private String status;
    private List<ServiceImageDTO> images;
    private ServiceTypeDTO serviceType;
}