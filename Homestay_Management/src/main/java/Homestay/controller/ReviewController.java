package Homestay.controller;

import Homestay.dto.ReviewRequest;
import Homestay.service.ReviewServiceManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    private ReviewServiceManagement reviewServiceManagement;

    @PostMapping
    public ResponseEntity<String> submit(@RequestBody ReviewRequest request) {
        reviewServiceManagement.submitReview(request);
        return ResponseEntity.ok("Gửi đánh giá thành công!");
    }
}

