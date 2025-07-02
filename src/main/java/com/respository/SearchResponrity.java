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

            SELECT 
            r.homestay_id, 
            r.room_number, 
            r.type AS type, 
            r.capacity AS capacity, 
            r.price AS price, 
            r.rating, 
            r.status,
            h.homestayName AS homestayName,
            h.address AS address,
            h.description AS description,
            h.host_id
        FROM Rooms r
        JOIN Homestays h ON r.homestay_id = h.homestay_id
        WHERE 
            (:keyword IS NULL 
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
          AND (
              :serviceKeyword IS NULL
              OR EXISTS (
                  SELECT 1
                  FROM Service s
                  JOIN ServiceType t ON s.type_id = t.type_id
                  WHERE s.homestay_id = r.homestay_id
                    AND s.status = 1
                    AND t.service_name COLLATE Vietnamese_CI_AI LIKE N'%' + :serviceKeyword + '%'
              )
          )
          AND (
              :experienceKeyword IS NULL
              OR EXISTS (
                  SELECT 1
                  FROM Experiences e
                  JOIN ExperienceType et ON e.type_id = et.type_id
                  WHERE e.homestay_id = r.homestay_id
                    AND e.status = 1
                    AND et.experience_name COLLATE Vietnamese_CI_AI LIKE N'%' + :experienceKeyword + '%'
              )
          )
        """, nativeQuery = true)
    List<Rooms> searchRoomsByFilters(
            @Param("keyword") String keyword,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minRating") Double minRating,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("serviceKeyword") String serviceKeyword,
            @Param("experienceKeyword") String experienceKeyword
    );
    @Query(value = """
    SELECT 
        r.homestay_id, r.room_number, r.type, r.capacity, r.price, 
        r.rating, r.status,
        h.homestayName, h.address, h.description, h.host_id
    FROM Rooms r
    JOIN Homestays h ON r.homestay_id = h.homestay_id
    WHERE (:location IS NULL 
            OR h.address COLLATE Vietnamese_CI_AI LIKE N'%' + :location + '%')
      AND (:minPrice IS NULL OR r.price >= :minPrice)
      AND (:minRating IS NULL OR r.rating >= :minRating)
      AND NOT EXISTS (
          SELECT 1 FROM Bookings b
          WHERE b.homestay_id = r.homestay_id
            AND b.room_number = r.room_number
            AND b.status IN ('confirmed', 'completed')
            AND (b.check_in_date <= :checkOutDate AND b.check_out_date >= :checkInDate)
      )
""", nativeQuery = true)
    List<Rooms> searchHotel(
            @Param("location") String location,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("minPrice") BigDecimal minPrice,
            @Param("minRating") Double minRating
    );
    @Query(value = """ 
    SELECT r.* 
    FROM Rooms r
    JOIN Homestays h ON r.homestay_id = h.homestay_id
    WHERE EXISTS (
        SELECT 1 FROM Service s
        JOIN ServiceType t ON s.type_id = t.type_id
        WHERE s.homestay_id = r.homestay_id
          AND s.status = 1
          AND t.service_name COLLATE Vietnamese_CI_AI LIKE N'%' + :serviceName + '%'
    )
""", nativeQuery = true)
    List<Rooms> searchHotelByServiceName(@Param("serviceName") String serviceName);


    @Query(value = """
    SELECT 
        e.experience_id,
        e.price,
        e.special_notes,
        h.address,
        et.experience_name
    FROM Experiences e
    JOIN Homestays h ON e.homestay_id = h.homestay_id
    JOIN ExperienceType et ON e.type_id = et.type_id
    WHERE (:location IS NULL 
            OR h.address COLLATE Vietnamese_CI_AI LIKE N'%' + :location + '%')
      AND (:experienceName IS NULL 
            OR et.experience_name COLLATE Vietnamese_CI_AI LIKE N'%' + :experienceName + '%')
      AND (:description IS NULL 
            OR et.description COLLATE Vietnamese_CI_AI LIKE N'%' + :description + '%')
""", nativeQuery = true)
    List<Object[]> searchExperiencesRaw(
            @Param("location") String location,
            @Param("experienceName") String experienceName,
            @Param("description") String description
    );


}