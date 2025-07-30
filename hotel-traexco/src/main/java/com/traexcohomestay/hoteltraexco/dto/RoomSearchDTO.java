package com.traexcohomestay.hoteltraexco.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomSearchDTO {
    private Integer homestayId;
    private String type;
    private Integer capacity;
    private BigDecimal price;
    private Double rating;
    private Boolean status;

    private String homestayName;
    private String location;
    private String address;

    private List<String> serviceNames;
    private List<String> experienceDescriptions;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    private List<String> imageUrls;
}
