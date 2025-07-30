package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.ReviewRequest;
import com.traexcohomestay.hoteltraexco.model.*;
import com.traexcohomestay.hoteltraexco.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserReviewService {

    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private ReviewRoomRepository reviewRoomRepo;

    @Autowired
    private ReviewServiceRepository reviewServiceRepo;

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private ServiceRepository serviceRepository;

    public void submitReview(ReviewRequest request) {
        // 1. Validate booking status
        Booking booking = bookingRepo.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy booking"));

        if (!booking.getUser().getId().equals(request.getUserId())) {
            throw new RuntimeException("Không hợp lệ: Booking không thuộc user này.");
        }

        // 2. Tạo review tổng thể
        Review review = new Review();
        review.setUser(booking.getUser());

        // ✅ Lấy homestay từ room
        Homestay homestay = roomRepo.findById(booking.getRooms().getId())
                .orElseThrow(() -> new RuntimeException("Phòng không tồn tại"))
                .getHomestay();
        review.setHomestay(homestay);

        review.setCreatedAt(LocalDateTime.now());
        review = reviewRepo.save(review);

        // 3. Review phòng
        ReviewRoom rr = new ReviewRoom();
        rr.setReview(review);
        rr.setRooms(booking.getRooms());
        rr.setRating(request.getRoomRating());
        rr.setComment(request.getRoomComment());
        reviewRoomRepo.save(rr);

        // 4. Review dịch vụ nếu có
        if (request.getServiceReviews() != null) {
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
}
