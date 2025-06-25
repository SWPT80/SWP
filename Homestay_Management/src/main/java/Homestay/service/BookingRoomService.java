package Homestay.service;

import Homestay.dto.*;
import Homestay.model.*;
import Homestay.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingRoomService {

    private final BookingRepository bookingRepo;
    private final RoomRepository roomRepo;
    private final UserRepository userRepo;

    public BookingRoomService(BookingRepository bookingRepo,
                              RoomRepository roomRepo,
                              UserRepository userRepo) {
        this.bookingRepo = bookingRepo;
        this.roomRepo    = roomRepo;
        this.userRepo    = userRepo;
    }

    /* ---------- PUBLIC APIs ---------- */

    public List<BookingResponse> findByUser(Integer userId) {
        return bookingRepo.findByUser_UserId(userId)
                .stream()
                .map(this::toDto)
                .toList();
    }

    public BookingResponse findById(Integer id) {
        return toDto(bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found")));
    }

    /** Tạo booking – dùng isolation cao để chống over-booking */
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public BookingResponse create(BookingRequest req) {
        validateDates(req.getCheckInDate(), req.getCheckOutDate());

        // 1. Kiểm tra room tồn tại
        Room room = roomRepo.findByHomestayIdAndRoomNumber(
                req.getHomestayId(), req.getRoomNumber());
        if (room == null)
            throw new RuntimeException("Room not found");

        // 2. Kiểm tra còn trống
        if (!bookingRepo.findOverlaps(
                req.getHomestayId(),
                req.getRoomNumber(),
                req.getCheckInDate(),
                req.getCheckOutDate()).isEmpty())
            throw new RuntimeException("Room is not available in selected dates");

        // 3. Tính giá
        BigDecimal nights = BigDecimal.valueOf(
                ChronoUnit.DAYS.between(req.getCheckInDate(), req.getCheckOutDate()));
        BigDecimal total  = room.getPrice().multiply(nights);

        // 4. Lưu booking
        Booking booking = new Booking();
        booking.setRoom(room);
        booking.setUser(userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found")));
        booking.setCheckInDate(req.getCheckInDate());
        booking.setCheckOutDate(req.getCheckOutDate());
        booking.setTotalPeople(req.getTotalPeople());
        booking.setTotalAmount(total);
        booking.setStatus(BookingStatus.PENDING.name());

        return toDto(bookingRepo.save(booking));
    }

    /** Host duyệt hoặc huỷ */
    @Transactional
    public BookingResponse changeStatus(Integer id, BookingStatus status) {
        Booking booking = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status.name());
        return toDto(bookingRepo.save(booking));
    }

    /* ---------- PRIVATE ---------- */

    private void validateDates(java.time.LocalDate in, java.time.LocalDate out) {
        if (!out.isAfter(in))
            throw new IllegalArgumentException("Check-out must be after check-in");
    }

    private BookingResponse toDto(Booking b) {
        BookingResponse dto = new BookingResponse();
        dto.setBookingId(b.getBookingId());
        dto.setHomestayId(b.getRoom().getHomestayId());
        dto.setRoomNumber(b.getRoom().getRoomNumber());
        dto.setCheckInDate(b.getCheckInDate());
        dto.setCheckOutDate(b.getCheckOutDate());
        dto.setTotalPeople(b.getTotalPeople());
        dto.setTotalAmount(b.getTotalAmount());
        dto.setStatus(BookingStatus.valueOf(b.getStatus()));
        return dto;
    }
}
