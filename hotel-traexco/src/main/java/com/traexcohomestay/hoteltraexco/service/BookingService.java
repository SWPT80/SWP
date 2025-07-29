package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.dto.BookingDTO;
import com.traexcohomestay.hoteltraexco.model.Booking;

import java.util.List;
import java.util.Map;

public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO);
    List<BookingDTO> getBookingsByHomestay(Integer homestayId);
    BookingDTO updateBookingStatus(Integer bookingId, String status);
    List<Booking> getBookingsWithServicesByUserId(int userId);
    BookingDTO cancelBooking(Integer bookingId);
    BookingDTO convertToDTO(Booking booking);
    List<BookingDTO> getBookingsByHost(Integer hostId);
    Map<String, Object> getHostMetrics(Integer hostId);
    List<BookingDTO> getBookingsByUser(Integer userId);
}