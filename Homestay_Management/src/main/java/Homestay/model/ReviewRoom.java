package Homestay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ReviewRoom")
public class ReviewRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewRoom_id")
    private Integer reviewRoomId;

    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "homestay_id", referencedColumnName = "homestay_id"),
            @JoinColumn(name = "room_number", referencedColumnName = "room_number")
    })
    private Room room;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "comment", columnDefinition = "NVARCHAR(MAX)")
    private String comment;

    // Getters and Setters

    public Integer getReviewRoomId() {
        return reviewRoomId;
    }

    public void setReviewRoomId(Integer reviewRoomId) {
        this.reviewRoomId = reviewRoomId;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
