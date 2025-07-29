package com.traexcohomestay.hoteltraexco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequestDTO {
    private Long userId;
    private Long targetId;
    private String targetType; // "homestay", "experience", "service"
}