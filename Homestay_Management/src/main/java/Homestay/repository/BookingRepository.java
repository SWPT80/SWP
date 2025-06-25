package Homestay.repository;

import Homestay.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUser_UserId(Integer userId);
    List<Booking> findByStatus(String status);
    @Query("""
       SELECT b FROM Booking b
       WHERE b.room.homestayId = :homestayId
         AND b.room.roomNumber = :roomNumber
         AND b.status <> 'CANCELLED'
         AND NOT (b.checkOutDate <= :checkIn OR b.checkInDate >= :checkOut)
       """)
    List<Booking> findOverlaps(Integer homestayId,
                               String roomNumber,
                               LocalDate checkIn,
                               LocalDate checkOut);

}
