package Homestay.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

// ReviewRequest.java
public class ReviewRequest {
    private Integer userId;
    private Integer bookingId;
    private Integer homestayId;
    private String roomNumber;

    private Integer roomRating;
    private String roomComment;

    private List<ServiceReviewDTO> serviceReviews;

    @Getter
    @Setter
    public static class ServiceReviewDTO {
        private Integer serviceId;
        private Integer rating;
        private String comment;
    }

    // Getters & setters...

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

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

    public Integer getRoomRating() {
        return roomRating;
    }

    public void setRoomRating(Integer roomRating) {
        this.roomRating = roomRating;
    }

    public String getRoomComment() {
        return roomComment;
    }

    public void setRoomComment(String roomComment) {
        this.roomComment = roomComment;
    }

    public List<ServiceReviewDTO> getServiceReviews() {
        return serviceReviews;
    }

    public void setServiceReviews(List<ServiceReviewDTO> serviceReviews) {
        this.serviceReviews = serviceReviews;
    }
}

