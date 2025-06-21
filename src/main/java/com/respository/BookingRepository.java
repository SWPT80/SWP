package com.respository;

import com.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    // 1. Tổng doanh thu theo tháng của từng homestay
    @Query("""
        SELECT MONTH(b.createdAt), b.homestayId, SUM(b.totalAmount)
        FROM Booking b
        JOIN Homestays h ON b.homestayId = h.homestayId
        WHERE b.status = 'completed' AND h.hostId = :hostId
        GROUP BY MONTH(b.createdAt), b.homestayId
        ORDER BY MONTH(b.createdAt), b.homestayId
    """)
    List<Object[]> findMonthlyRevenueByHomestay(@Param("hostId") int hostId);

    // 2. Doanh thu theo phòng theo từng tháng
    @Query("""
        SELECT MONTH(b.createdAt), b.homestayId, b.roomNumber, SUM(b.totalAmount)
        FROM Booking b
        JOIN Homestays h ON b.homestayId = h.homestayId
        WHERE b.status = 'completed' AND h.hostId = :hostId
        GROUP BY MONTH(b.createdAt), b.homestayId, b.roomNumber
        ORDER BY MONTH(b.createdAt), b.homestayId, b.roomNumber
    """)
    List<Object[]> findMonthlyRevenueByRoom(@Param("hostId") int hostId);

    // 3. Số lượt đặt theo loại phòng mỗi tháng
    @Query("""
        SELECT MONTH(b.createdAt), b.homestayId, r.roomType, COUNT(b)
        FROM Booking b
        JOIN Rooms r ON b.homestayId = r.homestayId AND b.roomNumber = r.roomId
        JOIN Homestays h ON b.homestayId = h.homestayId
        WHERE b.status = 'completed' AND h.hostId = :hostId
        GROUP BY MONTH(b.createdAt), b.homestayId, r.roomType
        ORDER BY MONTH(b.createdAt), b.homestayId, r.roomType
    """)
    List<Object[]> countBookingsByRoomTypeMonthly(@Param("hostId") int hostId);

    // 4. Danh sách khách đã từng đặt phòng theo host (tất cả trạng thái)
    @Query("""
    SELECT u.id, u.fullname, u.email, b.homestayId, b.checkInDate, b.checkOutDate, b.totalAmount, b.status
    FROM Booking b
    JOIN Users u ON b.userId = u.id
    JOIN Homestays h ON b.homestayId = h.homestayId
    WHERE h.host.id = :hostId
    ORDER BY b.createdAt DESC
""")
    List<Object[]> findUserBookingsByHost(@Param("hostId") int hostId);


    // 5. Chi tiết booking và dịch vụ của 1 user đối với host
    @Query("""
        SELECT b.bookingId, b.checkInDate, b.checkOutDate, b.totalAmount,
               st.serviceName, bs.quantity, s.price
        FROM BookingWithService bs
        JOIN bs.booking b
        JOIN Service s ON bs.service.id = s.id
        JOIN ServiceType st ON s.type.id = st.id
        JOIN Homestays h ON b.homestayId = h.homestayId
        WHERE h.hostId = :hostId AND b.userId = :userId
    """)
    List<Object[]> findUserBookingServiceDetail(@Param("hostId") int hostId, @Param("userId") int userId);
}
