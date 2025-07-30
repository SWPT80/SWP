package com.traexcohomestay.hoteltraexco.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class FavoriteListDTO {
    private Integer id;
    private String name;
    private String imageUrl;
    private Integer itemCount;
}
