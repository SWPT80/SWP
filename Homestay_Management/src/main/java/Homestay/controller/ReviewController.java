package Homestay.controller;

import Homestay.dto.ReviewRequest;
import Homestay.service.ReviewServiceManagement;
import Homestay.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private UserReviewService userReviewService;

    @Autowired
    private ReviewServiceManagement reviewServiceManagement;

    @PostMapping
    public ResponseEntity<String> submit(@RequestBody ReviewRequest request) {
        userReviewService.submitReview(request);
        return ResponseEntity.ok("Gửi đánh giá thành công!");
    }

    @GetMapping("/homestay/{homestayId}")
    public ResponseEntity<Map<String, Object>> getRatings(@PathVariable Integer homestayId,
                                                          @RequestParam(defaultValue = "week") String timeRange) {
        try {
            Integer hostId = getHostIdFromHomestayId(homestayId); // Cần implement
            if (hostId == null) {
                throw new RuntimeException("Không tìm thấy hostId cho homestayId: " + homestayId);
            }
            Double overallRating = reviewServiceManagement.getOverallRating(homestayId, timeRange, hostId);
            Map<String, Double> categoryRatings = reviewServiceManagement.getCategoryRatings(homestayId, timeRange, hostId);

            Map<String, Object> response = new HashMap<>();
            response.put("overallRating", overallRating);
            response.put("ratingDetails", categoryRatings);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Lỗi trong getRatings: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi nội bộ: " + e.getMessage()));
        }
    }

    private Integer getHostIdFromHomestayId(Integer homestayId) {
        // Cần inject HomestayRepository
        // return homestayRepository.findById(homestayId).map(Homestay::getHostId).orElse(null);
        // Giả định tạm thời dựa trên dữ liệu
        if (homestayId == 16) return 26; // Ví dụ
        return null; // Cần thay bằng logic thực tế
    }
}