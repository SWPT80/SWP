package com.respository;

import com.entity.RoomId;
import com.entity.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SearchResponrity extends JpaRepository<Rooms, RoomId> {

    @Query(value = """
        SELECT r.* FROM Rooms r
        JOIN Homestays h ON r.homestay_id = h.homestay_id   
        WHERE (:keyword IS NULL 
               OR h.address COLLATE Vietnamese_CI_AI LIKE N'%' + :keyword + '%' 
               OR h.description COLLATE Vietnamese_CI_AI LIKE N'%' + :keyword + '%')
          AND (:minPrice IS NULL OR r.price >= :minPrice)
          AND (:maxPrice IS NULL OR r.price <= :maxPrice)
          AND (:minRating IS NULL OR r.rating >= :minRating)
        """, nativeQuery = true)
    List<Rooms> searchRoomsByFilters(
            @Param("keyword") String keyword,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minRating") Double minRating
    );
}