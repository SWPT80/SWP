package com.traexcohomestay.hoteltraexco.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomTypeDTO {
    private String name;
    private Long value;

    public RoomTypeDTO(String name, Long value) {
        this.name = name;
        this.value = value;
    }
}
