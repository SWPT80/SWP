package com.traexcohomestay.hoteltraexco.dto;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class SearchRequestDTO {
    private String location;
    private BigDecimal minPrice;
    private Double minRating;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String serviceName;
    private String experienceKeyword;
}
