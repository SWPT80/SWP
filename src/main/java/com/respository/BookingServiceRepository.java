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

    // 1. Doanh thu từ dịch vụ theo tháng và theo homestay
    @Query("""
        SELECT MONTH(b.createdAt), h.homestayId, st.serviceName, SUM(bs.quantity * s.price)
        FROM BookingWithService bs
        JOIN bs.booking b
        JOIN bs.service s
        JOIN s.type st
        JOIN s.homestay h
        WHERE b.status = 'completed' AND h.hostId = :hostId
        GROUP BY MONTH(b.createdAt), h.homestayId, st.serviceName
        ORDER BY MONTH(b.createdAt), h.homestayId, st.serviceName
    """)
    List<Object[]> getDetailedServiceRevenuePerMonth(@Param("hostId") int hostId);

    // 2. Tổng số lượt sử dụng dịch vụ theo tháng và homestay
    @Query("""
        SELECT MONTH(b.createdAt), h.homestayId, st.serviceName, SUM(bs.quantity)
        FROM BookingWithService bs
        JOIN bs.booking b
        JOIN bs.service s
        JOIN s.type st
        JOIN s.homestay h
        WHERE b.status = 'completed' AND h.hostId = :hostId
        GROUP BY MONTH(b.createdAt), h.homestayId, st.serviceName
        ORDER BY MONTH(b.createdAt), h.homestayId, st.serviceName
    """)
    List<Object[]> countServiceBookingsByMonthAndHomestayAndService(@Param("hostId") int hostId);
}


