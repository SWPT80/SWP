package com.respository;

import com.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportBookingRepository extends JpaRepository<Booking, Integer> {

    // === 1. Tổng doanh thu theo thời gian ===

    @Query(value = """
    SELECT 
        DAY(b.check_out_date) AS day,
        b.homestay_id AS homestayId,
        SUM(b.total_amount) AS totalRevenue
    FROM Bookings b
    JOIN Homestays h ON b.homestay_id = h.homestay_id
    WHERE b.status = 'confirmed' AND h.host_id = :hostId
    GROUP BY DAY(b.check_out_date), b.homestay_id
    ORDER BY day, homestayId
""", nativeQuery = true)
    List<Object[]> findDailyRevenueByHomestay(@Param("hostId") int hostId);




    // 1.2 Theo tháng
    @Query(value = """
        SELECT MONTH(b.check_out_date), b.homestay_id, SUM(b.total_amount)
        FROM Bookings b
        JOIN Homestays h ON b.homestay_id = h.homestay_id
        WHERE b.status = 'confirmed' AND h.host_id = :hostId
        GROUP BY MONTH(b.check_out_date), b.homestay_id
        ORDER BY MONTH(b.check_out_date), b.homestay_id
    """, nativeQuery = true)
    List<Object[]> findMonthlyRevenueByHomestay(@Param("hostId") int hostId);

    // 1.3 Theo năm
    @Query(value = """
        SELECT YEAR(b.check_out_date), b.homestay_id, SUM(b.total_amount)
        FROM Bookings b
        JOIN Homestays h ON b.homestay_id = h.homestay_id
        WHERE b.status = 'confirmed' AND h.host_id = :hostId
        GROUP BY YEAR(b.check_out_date), b.homestay_id
        ORDER BY YEAR(b.check_out_date), b.homestay_id
    """, nativeQuery = true)
    List<Object[]> findYearlyRevenueByHomestay(@Param("hostId") int hostId);

    // === 2. Doanh thu theo phòng theo ngày ===
    @Query(value = """
        SELECT DAY(b.check_out_date), b.homestay_id, b.room_number, SUM(b.total_amount)
        FROM Bookings b
        JOIN Homestays h ON b.homestay_id = h.homestay_id
        WHERE b.status = 'confirmed' AND h.host_id = :hostId
        GROUP BY DAY(b.check_out_date), b.homestay_id, b.room_number
        ORDER BY DAY(b.check_out_date), b.homestay_id, b.room_number
    """, nativeQuery = true)
    List<Object[]> findDailyRevenueByRoom(@Param("hostId") int hostId);

    // 2.2 Doanh thu theo phòng theo tháng
    @Query(value = """
    SELECT MONTH(b.check_out_date), b.homestay_id, b.room_number, SUM(b.total_amount)
    FROM Bookings b
    JOIN Homestays h ON b.homestay_id = h.homestay_id
    WHERE b.status = 'confirmed' AND h.host_id = :hostId
    GROUP BY MONTH(b.check_out_date), b.homestay_id, b.room_number
    ORDER BY MONTH(b.check_out_date), b.homestay_id, b.room_number
""", nativeQuery = true)
    List<Object[]> findMonthlyRevenueByRoom(@Param("hostId") int hostId);

    // 2.3 Doanh thu theo phòng theo năm
    @Query(value = """
    SELECT YEAR(b.check_out_date), b.homestay_id, b.room_number, SUM(b.total_amount)
    FROM Bookings b
    JOIN Homestays h ON b.homestay_id = h.homestay_id
    WHERE b.status = 'confirmed' AND h.host_id = :hostId
    GROUP BY YEAR(b.check_out_date), b.homestay_id, b.room_number
    ORDER BY YEAR(b.check_out_date), b.homestay_id, b.room_number
""", nativeQuery = true)
    List<Object[]> findYearlyRevenueByRoom(@Param("hostId") int hostId);


    // === 3. Số lượt đặt theo loại phòng ===

    // === 3.1 Số lượt đặt theo loại phòng theo ngày ===
    @Query(value = """
        SELECT DAY(b.check_out_date), b.homestay_id, r.type, COUNT_BIG(b.booking_id)
        FROM Bookings b
        JOIN Rooms r ON b.homestay_id = r.homestay_id AND b.room_number = r.room_number
        JOIN Homestays h ON b.homestay_id = h.homestay_id
        WHERE b.status = 'confirmed' AND h.host_id = :hostId
        GROUP BY DAY(b.check_out_date), b.homestay_id, r.type
        ORDER BY DAY(b.check_out_date), b.homestay_id, r.type
    """, nativeQuery = true)
    List<Object[]> countBookingsByRoomTypeDaily(@Param("hostId") int hostId);

    // 3.2 Theo tháng
    @Query(value = """
        SELECT MONTH(b.check_out_date), b.homestay_id, r.type, COUNT_BIG(b.booking_id)
        FROM Bookings b
        JOIN Rooms r ON b.homestay_id = r.homestay_id AND b.room_number = r.room_number
        JOIN Homestays h ON b.homestay_id = h.homestay_id
        WHERE b.status = 'confirmed' AND h.host_id = :hostId
        GROUP BY MONTH(b.check_out_date), b.homestay_id, r.type
        ORDER BY MONTH(b.check_out_date), b.homestay_id, r.type
    """, nativeQuery = true)
    List<Object[]> countBookingsByRoomTypeMonthly(@Param("hostId") int hostId);

    // 3.3 Theo năm
    @Query(value = """
        SELECT YEAR(b.check_out_date), b.homestay_id, r.type, COUNT_BIG(b.booking_id)
        FROM Bookings b
        JOIN Rooms r ON b.homestay_id = r.homestay_id AND b.room_number = r.room_number
        JOIN Homestays h ON b.homestay_id = h.homestay_id
        WHERE b.status = 'confirmed' AND h.host_id = :hostId
        GROUP BY YEAR(b.check_out_date), b.homestay_id, r.type
        ORDER BY YEAR(b.check_out_date), b.homestay_id, r.type
    """, nativeQuery = true)
    List<Object[]> countBookingsByRoomTypeYearly(@Param("hostId") int hostId);


    // 4. Danh sách khách đã từng đặt phòng theo host (tất cả trạng thái)
    @Query(value = """
    SELECT 
        b.booking_id,
        u.user_id,
        u.fullName ,
        u.email,
        b.check_in_date,
        b.check_out_date,
        r.type AS room_type,
        r.price AS room_price,
        b.total_people,
        b.total_amount,
        b.status
    FROM Bookings b
    JOIN Users u ON b.user_id = u.user_id
    JOIN Homestays h ON b.homestay_id = h.homestay_id
    JOIN Rooms r ON b.homestay_id = r.homestay_id AND b.room_number = r.room_number
    WHERE h.host_id = :hostId
    ORDER BY b.created_at DESC
""", nativeQuery = true)
    List<Object[]> findBookingsWithRoomDetailsByHost(@Param("hostId") int hostId);

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
