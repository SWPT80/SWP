// BookingManagementController.java
package Homestay.controller;

import Homestay.model.Booking;
import Homestay.service.BookingServiceManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingManagementController {
    @Autowired
    private BookingServiceManagement bookingService;

    @PostMapping
    public ResponseEntity<Booking> create(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.create(booking));
    }

    @GetMapping
    public List<Booking> getAll() {
        return bookingService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> get(@PathVariable Integer id) {
        return ResponseEntity.ok(bookingService.findById(id));
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getByUser(@PathVariable Integer userId) {
        return bookingService.findByUser(userId);
    }

    @GetMapping("/status/{status}")
    public List<Booking> getByStatus(@PathVariable String status) {
        return bookingService.findByStatus(status);
    }

    @PutMapping("/{id}")
    public Booking update(@PathVariable Integer id, @RequestBody Booking booking) {
        return bookingService.update(id, booking);
    }

    @PatchMapping("/{id}/status")
    public Booking updateStatus(@PathVariable Integer id, @RequestParam String status) {
        return bookingService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        bookingService.delete(id);
    }
}
