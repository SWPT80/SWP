package com.respository;

import com.entity.RoomId;
import com.entity.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface SearchResponrity extends JpaRepository<Rooms, RoomId> {

    @Query(value = """

            SELECT r.* FROM Rooms r
       JOIN Homestays h ON r.homestay_id = h.homestay_id
       WHERE (:keyword IS NULL\s
              OR h.address COLLATE Vietnamese_CI_AI LIKE N'%' + :keyword + '%'
              OR h.description COLLATE Vietnamese_CI_AI LIKE N'%' + :keyword + '%')
         AND (:minPrice IS NULL OR r.price >= :minPrice)
         AND (:maxPrice IS NULL OR r.price <= :maxPrice)
         AND (:minRating IS NULL OR r.rating >= :minRating)
         AND NOT EXISTS (
             SELECT 1 FROM Bookings b
             WHERE b.homestay_id = r.homestay_id
               AND b.room_number = r.room_number 
               AND b.status IN ('confirmed', 'completed')
               AND (
                    (b.check_in_date <= :checkOutDate AND b.check_out_date >= :checkInDate)
                   )
         )
       
    """, nativeQuery = true)
    List<Rooms> searchRoomsByFilters(
            @Param("keyword") String keyword,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minRating") Double minRating,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate
    );

}