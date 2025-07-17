package com.traexcohomestay.hoteltraexco.dto.request;

import java.math.BigDecimal;

public class RoomCreateRequest {
    private Integer hostId;       // frontend truyền vào
    private String roomId;        // khóa chính thứ 2
    private String roomType;
    private int roomCapacity;
    private BigDecimal roomPrice;
    private double rating;
    private boolean status;
    private Integer HomestayId;

    public Integer getHomestayId() {
        return HomestayId;
    }

    public void setHomestayId(Integer homestayId) {
        HomestayId = homestayId;
    }
    // Getters & Setters

    public Integer getHostId() {
        return hostId;
    }

    public void setHostId(Integer hostId) {
        this.hostId = hostId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getRoomCapacity() {
        return roomCapacity;
    }

    public void setRoomCapacity(int roomCapacity) {
        this.roomCapacity = roomCapacity;
    }

    public BigDecimal getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(BigDecimal roomPrice) {
        this.roomPrice = roomPrice;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}

