package com.traexcohomestay.hoteltraexco.repository;

import com.traexcohomestay.hoteltraexco.model.Booking;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay", "bookingServices", "bookingServices.service", "bookingServices.service.serviceType"})
    Optional<Booking> findById(Integer id);
    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay", "bookingServices", "bookingServices.service", "bookingServices.service.serviceType"})
    Optional<Booking> findTopByUserIdOrderByCreatedAtDesc(Integer userId);
    // Phương thức tìm booking theo homestayId với EntityGraph để tải tất cả quan hệ cần thiết
    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay", "bookingServices", "bookingServices.service", "bookingServices.service.serviceType"})
    List<Booking> findByRooms_Id_HomestayId(Integer homestayId);
    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay", "bookingServices", "bookingServices.service", "bookingServices.service.serviceType"})
    List<Booking> findByUserId(Integer userId);
    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay", "bookingServices", "bookingServices.service", "bookingServices.service.serviceType"})
    @Query("SELECT b FROM Booking b JOIN b.rooms r JOIN r.homestay h WHERE h.hostId = :hostId")
    List<Booking> findByRoomsHomestayHostId(@Param("hostId") Integer hostId);
    // Phương thức tìm booking theo trạng thái và homestayId
    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay"})
    List<Booking> findByStatusAndRooms_Id_HomestayId(String status, Integer homestayId);
    @EntityGraph(attributePaths = {"user"})
    @Query("SELECT b.user.id FROM Booking b WHERE b.id = :bookingId")
    Integer findUserIdByBookingId(@Param("bookingId") Integer bookingId);
    @EntityGraph(attributePaths = {"user", "rooms", "rooms.homestay", "bookingServices", "bookingServices.service", "bookingServices.service.serviceType"})
    List<Booking> findByRooms_Id_HomestayIdAndRooms_Id_RoomNumber(Integer homestayId, String roomNumber);
    @Query("SELECT b.user.id FROM Booking b WHERE b.id = :bookingId")
    boolean existsByUserIdAndStatus(Integer userId, String status);
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.rooms.homestay.hostId = :hostId")
    long countByRoomsHomestayHostId(@Param("hostId") Integer hostId);
    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b " +
            "WHERE b.rooms.homestay.hostId = :hostId AND b.status IN ('CONFIRMED', 'CHECKED_OUT')")
    BigDecimal sumRevenueByHostId(@Param("hostId") Integer hostId);

}