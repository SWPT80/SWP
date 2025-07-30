package com.traexcohomestay.hoteltraexco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class RoomPriceResponseDTO {
    private String roomNumber;
    private BigDecimal basePrice;
    private BigDecimal finalPrice;
    private String seasonApplied;
    private BigDecimal increaseRate;
}
