package Homestay.repository;

import Homestay.model.BookingService;
import Homestay.model.BookingServiceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingServiceRepository extends JpaRepository<BookingService, BookingServiceId> {
    List<BookingService> findByBooking_BookingId(Integer bookingId);
}
