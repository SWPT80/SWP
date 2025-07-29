package com.traexcohomestay.hoteltraexco.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class BookingDTO {
    private Integer id;
    private Integer userId;
    private String userName;
    private String email;
    private Integer homestayId;
    private String homestayName;
    private String roomNumber;
    private String roomType;
    private BigDecimal roomPrice;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkInDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkOutDate;
    private Integer adults;
    private Integer children;
    private Integer totalPeople;
    private BigDecimal totalAmount;
    private String status;
    private List<String> services;
    private List<ServiceDTO> serviceDetails;
    private List<String> roomImages;
    private List<String> homestayImages;
    public List<ServiceDTO> getServiceDetails() {
        return serviceDetails;
    }

    public void setServiceDetails(List<ServiceDTO> serviceDetails) {
        this.serviceDetails = serviceDetails;
    }
}