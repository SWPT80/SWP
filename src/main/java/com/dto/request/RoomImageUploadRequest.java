package com.dto.request;



import lombok.Data;

@Data
public class RoomImageUploadRequest {
    private int homestayId;
    private String roomId;
    private String imageUrl;
    private String description;
}
