package com.traexcohomestay.hoteltraexco.dto.request;


import java.time.LocalDate;


public class RoomAvailabilityRequest {
    private Integer homestayId;
    private String roomNumber;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;


    // Getters and setters
    public Integer getHomestayId() { return homestayId; }
    public void setHomestayId(Integer homestayId) { this.homestayId = homestayId; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public LocalDate getCheckInDate() { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; }
    public LocalDate getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }
}



