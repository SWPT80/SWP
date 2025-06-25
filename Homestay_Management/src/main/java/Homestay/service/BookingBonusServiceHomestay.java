package Homestay.service;

import Homestay.dto.BookingServiceRequest;
import Homestay.model.Booking;
import Homestay.model.BookingService;
import Homestay.model.HomestayService;
import Homestay.repository.BookingRepository;
import Homestay.repository.BookingServiceRepository;
import Homestay.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingBonusServiceHomestay {

    @Autowired
    private BookingServiceRepository bookingServiceRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    public void addServiceToBooking(BookingServiceRequest request) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        HomestayService service = serviceRepository.findById(request.getOptionId())
                .orElseThrow(() -> new RuntimeException("Service option not found"));

        BookingService bookingService = new BookingService();
        bookingService.setBooking(booking);
        bookingService.setService(service);
        bookingService.setQuantity(request.getQuantity());

        bookingServiceRepository.save(bookingService);
    }

    public List<BookingService> getServicesByBooking(Integer bookingId) {
        return bookingServiceRepository.findByBooking_BookingId(bookingId);
    }
}