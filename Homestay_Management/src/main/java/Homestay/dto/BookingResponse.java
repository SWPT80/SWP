package Homestay.dto;

import Homestay.model.BookingStatus;
import java.math.BigDecimal;
import java.time.LocalDate;

public class BookingResponse {
    private Integer bookingId;
    private Integer homestayId;
    private String roomNumber;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Integer totalPeople;
    private BigDecimal totalAmount;
    private BookingStatus status;

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
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

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}
