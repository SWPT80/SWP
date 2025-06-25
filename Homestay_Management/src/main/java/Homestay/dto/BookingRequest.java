package Homestay.dto;

import java.time.LocalDate;

public class BookingRequest {
    private Integer userId;
    private Integer homestayId;
    private String roomNumber;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer totalPeople;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getHomestayId() {
        return homestayId;
    }

    public void setHomestayId(Integer homestayId) {
        this.homestayId = homestayId;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Integer getTotalPeople() {
        return totalPeople;
    }

    public void setTotalPeople(Integer totalPeople) {
        this.totalPeople = totalPeople;
    }
}
