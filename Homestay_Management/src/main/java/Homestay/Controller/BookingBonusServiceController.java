package Homestay.Controller;

import Homestay.DTO.BookingServiceRequest;
import Homestay.Model.BookingService;
import Homestay.Service.BookingBonusServiceHomestay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking-services")
public class BookingBonusServiceController {

    @Autowired
    private BookingBonusServiceHomestay bookingServiceHomestay;

    @PostMapping
    public String addServiceToBooking(@RequestBody BookingServiceRequest request) {
        bookingServiceHomestay.addServiceToBooking(request);
        return "Service added to booking successfully.";
    }

    @GetMapping("/{bookingId}")
    public List<BookingService> getServices(@PathVariable Integer bookingId) {
        return bookingServiceHomestay.getServicesByBooking(bookingId);
    }
}
