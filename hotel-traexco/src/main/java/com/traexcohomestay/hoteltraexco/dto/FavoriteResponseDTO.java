package com.traexcohomestay.hoteltraexco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteResponseDTO {
    private Long favoriteId;
    private Long userId;
    private Long targetId;
    private String targetType;
    private LocalDateTime createdAt;

    // Optional – show thêm thông tin ra frontend
    private String name;
    private String imageUrl;
    private Integer listId;
}
