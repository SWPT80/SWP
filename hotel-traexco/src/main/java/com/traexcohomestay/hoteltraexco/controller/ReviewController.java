package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.ReviewDTO;
import com.traexcohomestay.hoteltraexco.dto.ReviewRequest;
import com.traexcohomestay.hoteltraexco.service.ReviewRoomService;
import com.traexcohomestay.hoteltraexco.service.ReviewServiceManagement;
import com.traexcohomestay.hoteltraexco.service.ReviewServiceService;
import com.traexcohomestay.hoteltraexco.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewRoomService reviewRoomService;

    @Autowired
    private ReviewServiceService reviewServiceService;

    @Autowired
    private ReviewServiceManagement reviewServiceManagement;

    @Autowired
    private UserReviewService userReviewService;

    // ✅ [POST] Submit Review (Phòng & Dịch vụ)
    @PostMapping("/submit")
    public ResponseEntity<String> submitReview(@RequestBody ReviewRequest request) {
        try {
            userReviewService.submitReview(request);
            return ResponseEntity.ok("Đánh giá đã được gửi thành công.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    // ✅ [GET] Review theo Phòng
    @GetMapping("/room/{homestayId}/{roomNumber}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByRoom(@PathVariable Integer homestayId, @PathVariable String roomNumber) {
        List<ReviewDTO> reviews = reviewRoomService.getReviewsByRoom(homestayId, roomNumber);
        return ResponseEntity.ok(reviews);
    }

    // ✅ [GET] Review theo Dịch vụ
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByService(@PathVariable Integer serviceId) {
        List<ReviewDTO> reviews = reviewServiceService.getReviewsByService(serviceId);
        return ResponseEntity.ok(reviews);
    }

    // ✅ [GET] Điểm đánh giá tổng thể Homestay
    @GetMapping("/overall-rating/{homestayId}")
    public ResponseEntity<Double> getOverallRating(@PathVariable Integer homestayId, @RequestParam(defaultValue = "week") String timeRange, @RequestParam(required = false) Integer hostId) {
        Double rating = reviewServiceManagement.getOverallRating(homestayId, timeRange, hostId);
        return ResponseEntity.ok(rating);
    }

    // ✅ [GET] Điểm theo từng hạng mục (phòng & dịch vụ)
    @GetMapping("/category-ratings/{homestayId}")
    public ResponseEntity<Map<String, Double>> getCategoryRatings(@PathVariable Integer homestayId, @RequestParam(defaultValue = "week") String timeRange, @RequestParam(required = false) Integer hostId) {
        Map<String, Double> ratings = reviewServiceManagement.getCategoryRatings(homestayId, timeRange, hostId);
        return ResponseEntity.ok(ratings);
    }
}
