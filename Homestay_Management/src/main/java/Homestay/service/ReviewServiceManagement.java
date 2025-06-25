package Homestay.service;

import Homestay.dto.ReviewRequest;
import Homestay.model.Booking;
import Homestay.model.Review;
import Homestay.model.ReviewRoom;
import Homestay.model.ReviewService;
import Homestay.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ReviewServiceManagement {

    @Autowired private ReviewRepository reviewRepo;
    @Autowired private ReviewRoomRepository reviewRoomRepo;
    @Autowired private ReviewServiceRepository reviewServiceRepo;
    @Autowired private BookingRepository bookingRepo;
    @Autowired private RoomRepository roomRepo;
    @Autowired private ServiceRepository serviceRepository;

    public void submitReview(ReviewRequest request) {
        // Validate booking status
        Booking booking = bookingRepo.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy booking"));

        if (!booking.getUser().getUserId().equals(request.getUserId())) {
            throw new RuntimeException("Không hợp lệ: Booking không thuộc user này.");
        }

        // 1. Review tổng thể
        Review review = new Review();
        review.setUser(booking.getUser());
        review.setRating(request.getRoomRating()); // Tổng rating có thể là room rating
        review.setComment(request.getRoomComment());
        review.setCreatedAt(LocalDateTime.now());
        review = reviewRepo.save(review);

        // 2. Review phòng
        ReviewRoom rr = new ReviewRoom();
        rr.setReview(review);
        rr.setRoom(booking.getRoom());
        rr.setRating(request.getRoomRating());
        rr.setComment(request.getRoomComment());
        reviewRoomRepo.save(rr);

        // 3. Review dịch vụ
        for (ReviewRequest.ServiceReviewDTO s : request.getServiceReviews()) {
            ReviewService rs = new ReviewService();
            rs.setReview(review);
            rs.setService(serviceRepository.findById(s.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service không tồn tại")));
            rs.setRating(s.getRating());
            rs.setComment(s.getComment());
            reviewServiceRepo.save(rs);
        }
    }
}

