package com.traexcohomestay.hoteltraexco.dto;

import lombok.Data;

@Data
public class AddToFavoriteListDTO {
    private Integer userId;
    private Integer targetId;
    private String targetType; // homestay, service, experience
    private Integer listId;
}

