package Homestay.Repository;

import Homestay.Model.BookingService;
import Homestay.Model.BookingServiceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingServiceRepository extends JpaRepository<BookingService, BookingServiceId> {
    List<BookingService> findByBooking_BookingId(Integer bookingId);
}
