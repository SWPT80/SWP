package com.traexcohomestay.hoteltraexco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FavoriteListResponseDTO {
    private Integer listId;
    private Integer userId;
    private String name;
    private LocalDateTime createdAt;
}
