package Homestay.controller;

import Homestay.dto.*;
import Homestay.model.BookingStatus;
import Homestay.service.BookingRoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking-rooms")
public class BookingRoomController {

    private final BookingRoomService bookingService;

    public BookingRoomController(BookingRoomService bookingService) {
        this.bookingService = bookingService;
    }

    /* ---------- Khách hàng ---------- */

    @GetMapping("/user/{userId}")
    public List<BookingResponse> getByUser(@PathVariable Integer userId) {
        return bookingService.findByUser(userId);
    }

    @GetMapping("/{id}")
    public BookingResponse getById(@PathVariable Integer id) {
        return bookingService.findById(id);
    }

    @PostMapping
    public ResponseEntity<BookingResponse> create(@RequestBody BookingRequest req) {
        return ResponseEntity.ok(bookingService.create(req));
    }

    /* ---------- Host / Admin ---------- */

    @PatchMapping("/{id}/status")
    public BookingResponse changeStatus(@PathVariable Integer id,
                                        @RequestParam BookingStatus status) {
        return bookingService.changeStatus(id, status);
    }
}
