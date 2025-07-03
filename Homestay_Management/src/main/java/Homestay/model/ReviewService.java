package Homestay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ReviewService")
public class ReviewService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewService_id")
    private Integer reviewServiceId;

    @ManyToOne
    @JoinColumn(name = "review_id")
    private Review review;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private HomestayService service;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "comment", columnDefinition = "NVARCHAR(MAX)")
    private String comment;

    // Getters and Setters

    public Integer getReviewServiceId() {
        return reviewServiceId;
    }

    public void setReviewServiceId(Integer reviewServiceId) {
        this.reviewServiceId = reviewServiceId;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    public HomestayService getService() {
        return service;
    }

    public void setService(HomestayService service) {
        this.service = service;
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
