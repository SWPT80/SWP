package Homestay.Repository;

import Homestay.Model.Booking;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BookingChartRepository extends CrudRepository<Booking, Integer> {

    @Query("SELECT MONTH(b.checkInDate), SUM(b.totalAmount) FROM Booking b GROUP BY MONTH(b.checkInDate) ORDER BY MONTH(b.checkInDate)")
    List<Object[]> getMonthlyRevenue();

}
