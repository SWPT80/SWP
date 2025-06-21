package com.services;

import com.entity.Booking;
import com.respository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getBookingsWithServicesByUserId(int userId) {
        List<Booking> bookings = bookingRepository.findAll()
                .stream()
                .filter(b -> b.getUserId() == userId)
                .collect(Collectors.toList());

        // Lazy loading fix if needed
        bookings.forEach(booking -> booking.getBookingServices().size());

        return bookings;
    }
}