package Homestay.service;

import Homestay.model.Booking;
import Homestay.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceManagement {

    @Autowired
    private BookingRepository bookingRepo;

    public List<Booking> findAll() {
        return bookingRepo.findAll();
    }

    public Booking findById(Integer id) {
        return bookingRepo.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public List<Booking> findByUser(Integer userId) {
        return bookingRepo.findByUser_UserId(userId);
    }

    public List<Booking> findByStatus(String status) {
        return bookingRepo.findByStatus(status);
    }

    public Booking create(Booking booking) {
        return bookingRepo.save(booking);
    }

    public Booking update(Integer id, Booking updated) {
        Booking existing = findById(id);
        existing.setRoom(updated.getRoom());
        existing.setCheckInDate(updated.getCheckInDate());
        existing.setCheckOutDate(updated.getCheckOutDate());
        existing.setAdults(updated.getAdults());
        existing.setChildren(updated.getChildren());
        existing.setTotalPeople(updated.getTotalPeople());
        existing.setTotalAmount(updated.getTotalAmount());
        existing.setStatus(updated.getStatus());
        return bookingRepo.save(existing);
    }

    public Booking updateStatus(Integer id, String status) {
        Booking booking = findById(id);
        booking.setStatus(status);
        return bookingRepo.save(booking);
    }

    public void delete(Integer id) {
        bookingRepo.deleteById(id);
    }
}
