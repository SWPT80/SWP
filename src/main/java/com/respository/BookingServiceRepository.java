package com.respository;

import com.entity.BookingWithService;
import com.entity.BookingServiceKey;
import com.services.BookingService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingServiceRepository extends JpaRepository<BookingWithService, BookingServiceKey> {
    // 1.1 Doanh thu dịch vụ theo ngày
    @Query(value = """
        SELECT DAY(b.check_out_date), h.homestay_id, st.service_name, SUM(bs.quantity * s.price)
        FROM BookingServices bs
        JOIN Bookings b ON bs.booking_id = b.booking_id
        JOIN Service s ON bs.service_id = s.service_id
        JOIN ServiceType st ON s.type_id = st.type_id
        JOIN Homestays h ON b.homestay_id = h.homestay_id
        WHERE b.status = 'confirmed' AND h.host_id = :hostId
        GROUP BY DAY(b.check_out_date), h.homestay_id, st.service_name
        ORDER BY DAY(b.check_out_date), h.homestay_id, st.service_name
    """, nativeQuery = true)
    List<Object[]> getServiceRevenueByDay(@Param("hostId") int hostId);

    // 1.2 Theo tháng
    @Query(value = """
    SELECT MONTH(b.check_out_date), h.homestay_id, st.service_name, SUM(bs.quantity * s.price)
    FROM BookingServices bs
    JOIN Bookings b ON bs.booking_id = b.booking_id
    JOIN Service s ON bs.service_id = s.service_id
    JOIN ServiceType st ON s.type_id = st.type_id
    JOIN Homestays h ON b.homestay_id = h.homestay_id -- sửa đúng JOIN
    WHERE b.status = 'confirmed' AND h.host_id = :hostId
    GROUP BY MONTH(b.check_out_date), h.homestay_id, st.service_name
    ORDER BY MONTH(b.check_out_date), h.homestay_id, st.service_name
""", nativeQuery = true)
    List<Object[]> getServiceRevenueByMonth(@Param("hostId") int hostId);

    // 1.3 Theo năm
    @Query(value = """
    SELECT YEAR(b.check_out_date), h.homestay_id, st.service_name, SUM(bs.quantity * s.price)
    FROM BookingServices bs
    JOIN  Bookings b ON bs.booking_id = b.booking_id
    JOIN Service s ON bs.service_id = s.service_id
    JOIN ServiceType st ON s.type_id = st.type_id
    JOIN Homestays h ON b.homestay_id = h.homestay_id -- sửa đúng JOIN
    WHERE b.status = 'confirmed' AND h.host_id = :hostId
    GROUP BY YEAR(b.check_out_date), h.homestay_id, st.service_name
    ORDER BY YEAR(b.check_out_date), h.homestay_id, st.service_name
""", nativeQuery = true)
    List<Object[]> getServiceRevenueByYear(@Param("hostId") int hostId);

    // 2.1 Lượt sử dụng dịch vụ theo ngày
    @Query(value = """
        SELECT DAY(b.check_out_date), h.homestay_id, st.service_name, SUM(bs.quantity)
        FROM BookingServices bs
        JOIN Bookings b ON bs.booking_id = b.booking_id
        JOIN Service s ON bs.service_id = s.service_id
        JOIN ServiceType st ON s.type_id = st.type_id
        JOIN Homestays h ON b.homestay_id = h.homestay_id
        WHERE b.status = 'confirmed' AND h.host_id = :hostId
        GROUP BY DAY(b.check_out_date), h.homestay_id, st.service_name
        ORDER BY DAY(b.check_out_date), h.homestay_id, st.service_name
    """, nativeQuery = true)
    List<Object[]> countServiceUsageByDay(@Param("hostId") int hostId);

    // 2.2 Theo tháng
    @Query(value = """
    SELECT MONTH(b.check_out_date), h.homestay_id, st.service_name, SUM(bs.quantity)
    FROM BookingServices bs
    JOIN Bookings b ON bs.booking_id = b.booking_id
    JOIN Service s ON bs.service_id = s.service_id
    JOIN ServiceType st ON s.type_id = st.type_id
    JOIN Homestays h ON b.homestay_id = h.homestay_id -- sửa đúng JOIN
    WHERE b.status = 'confirmed' AND h.host_id = :hostId
    GROUP BY MONTH(b.check_out_date), h.homestay_id, st.service_name
    ORDER BY MONTH(b.check_out_date), h.homestay_id, st.service_name
""", nativeQuery = true)
    List<Object[]> countServiceUsageByMonth(@Param("hostId") int hostId);

    // 2.3 Theo năm
    @Query(value = """
    SELECT YEAR(b.check_out_date), h.homestay_id, st.service_name, SUM(bs.quantity)
    FROM BookingServices bs
    JOIN Bookings b ON bs.booking_id = b.booking_id
    JOIN Service s ON bs.service_id = s.service_id
    JOIN ServiceType st ON s.type_id = st.type_id
    JOIN Homestays h ON b.homestay_id = h.homestay_id -- sửa đúng JOIN
    WHERE b.status = 'confirmed' AND h.host_id = :hostId
    GROUP BY YEAR(b.check_out_date), h.homestay_id, st.service_name
    ORDER BY YEAR(b.check_out_date), h.homestay_id, st.service_name
""", nativeQuery = true)
    List<Object[]> countServiceUsageByYear(@Param("hostId") int hostId);
}


