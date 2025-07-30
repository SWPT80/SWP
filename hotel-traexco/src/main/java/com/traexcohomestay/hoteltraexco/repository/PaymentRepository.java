package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p FROM Payment p WHERE p.booking.rooms.homestay.hostId = :hostId AND p.status = :status")
    List<Payment> findByBookingRoomsHomestayHostIdAndStatus(Integer hostId, String status);

    Optional<Payment> findByPaymentDetailsContaining(String txnRef);
    //---------------------------------------------------------------------------------------
    /**
     * Tìm payments theo booking ID và status
     */
    List<Payment> findByBookingIdAndStatus(Integer bookingId, String status);

    /**
     * Tìm payments theo booking ID, sắp xếp theo ngày giảm dần
     */
    List<Payment> findByBookingIdOrderByPaymentDateDesc(Integer bookingId);

    /**
     * Tìm các payments đã hết hạn (PENDING quá thời gian quy định)
     */
    List<Payment> findByStatusAndPaymentDateBefore(String status, Instant cutoffTime);

    /**
     * Tìm payment gần nhất của một booking
     */
    @Query("SELECT p FROM Payment p WHERE p.booking.id = :bookingId ORDER BY p.paymentDate DESC")
    Optional<Payment> findLatestPaymentByBookingId(@Param("bookingId") Integer bookingId);

    /**
     * Đếm số lần payment thất bại của một booking
     */
    @Query("SELECT COUNT(p) FROM Payment p WHERE p.booking.id = :bookingId AND p.status IN ('FAILED', 'CANCELLED', 'EXPIRED')")
    Long countFailedPaymentsByBookingId(@Param("bookingId") Integer bookingId);

    /**
     * Tìm các payments cần được hủy tự động
     */
    @Query("SELECT p FROM Payment p WHERE p.status = 'PENDING' AND p.paymentDate < :expiredTime")
    List<Payment> findExpiredPendingPayments(@Param("expiredTime") Instant expiredTime);

    Optional<Payment> findByBookingId(Integer bookingId);
}