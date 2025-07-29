package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.BookingDTO;
import com.traexcohomestay.hoteltraexco.dto.ServiceDTO;
import com.traexcohomestay.hoteltraexco.dto.ServiceTypeDTO;
import com.traexcohomestay.hoteltraexco.exception.ResourceNotFoundException;
import com.traexcohomestay.hoteltraexco.model.Booking;
import com.traexcohomestay.hoteltraexco.model.User;
import com.traexcohomestay.hoteltraexco.repository.BookingRepository;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import com.traexcohomestay.hoteltraexco.service.BookingService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BookingService bookingService;
    @Autowired
    private UserRepository userRepository;

    // Lấy tất cả booking + userFullName
    @GetMapping("/with-user-info")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Map<String, Object>>> getAllBookingsWithUserInfo() {
        List<Booking> bookings = bookingRepository.findAll();

        List<Map<String, Object>> result = bookings.stream().map(booking -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", booking.getId());
            map.put("userId", booking.getUser().getId());
            map.put("userFullName", booking.getUser().getFullName());
            map.put("checkInDate", booking.getCheckInDate());
            map.put("checkOutDate", booking.getCheckOutDate());
            map.put("totalAmount", booking.getTotalAmount());
            map.put("status", booking.getStatus());
            map.put("roomNumber", booking.getRooms().getId().getRoomNumber());
            map.put("homestayName", booking.getRooms().getHomestay().getHomestayName());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    // Lấy 1 booking theo id + userFullName
    @GetMapping("/{id}/with-user-info")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getBookingWithUserInfo(@PathVariable Integer id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        Map<String, Object> map = new HashMap<>();
        map.put("id", booking.getId());
        map.put("userId", booking.getUser().getId());
        map.put("userFullName", booking.getUser().getFullName());
        map.put("checkInDate", booking.getCheckInDate());
        map.put("checkOutDate", booking.getCheckOutDate());
        map.put("totalAmount", booking.getTotalAmount());
        map.put("status", booking.getStatus());
        map.put("roomNumber", booking.getRooms().getId().getRoomNumber());
        map.put("homestayName", booking.getRooms().getHomestay().getHomestayName());

        return ResponseEntity.ok(map);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('HOST') or hasRole('ADMIN')")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Integer id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        Hibernate.initialize(booking.getBookingServices());
        if (booking.getBookingServices() != null) {
            booking.getBookingServices().forEach(bs -> {
                Hibernate.initialize(bs.getService());
                if (bs.getService() != null) {
                    Hibernate.initialize(bs.getService().getServiceType());
                }
            });
        }
        BookingDTO dto = convertToDTO(booking);
        Map<String, Object> response = new HashMap<>();
        response.put("booking", dto);
        response.put("userFullName", booking.getUser().getFullName());

        return ResponseEntity.ok(convertToDTO(booking));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createBooking(@RequestBody BookingDTO bookingDTO, Authentication authentication) {
        try {
            // Lấy thông tin người dùng từ token JWT
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

            // Kiểm tra userId trong bookingDTO khớp với người dùng đã đăng nhập
            if (!user.getId().equals(bookingDTO.getUserId())) {
                return ResponseEntity.badRequest().body("Không được phép: userId không khớp với người dùng đã đăng nhập");
            }

            // Kiểm tra trạng thái người dùng
            if (!userRepository.existsByIdAndStatus(bookingDTO.getUserId(), true)) {
                return ResponseEntity.badRequest().body("Người dùng không hợp lệ hoặc bị vô hiệu hóa");
            }

            BookingDTO createdBooking = bookingService.createBooking(bookingDTO);
            return ResponseEntity.ok(createdBooking);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi khi tạo đặt phòng: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}/latest")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<BookingDTO> getLatestBookingByUser(@PathVariable Integer userId) {
        Booking booking = bookingRepository.findTopByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đặt phòng nào cho người dùng này."));
        BookingDTO bookingDTO = convertToDTO(booking);
        return ResponseEntity.ok(bookingDTO);
    }

    @GetMapping("/homestay/{homestayId}")
    @PreAuthorize("hasRole('HOST') or hasRole('ADMIN')")
    public ResponseEntity<List<BookingDTO>> getBookingsByHomestay(@PathVariable Integer homestayId) {
        List<BookingDTO> bookings = bookingService.getBookingsByHomestay(homestayId);
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/{bookingId}/status")
    @PreAuthorize("hasRole('HOST') or hasRole('ADMIN')")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable Integer bookingId,
            @RequestParam String status,
            @RequestParam(required = false) String reason) {
        try {
            BookingDTO updatedBooking = bookingService.updateBookingStatus(bookingId, status);
            return ResponseEntity.ok(updatedBooking);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{bookingId}/cancel")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> cancelBooking(@PathVariable Integer bookingId, Authentication authentication) {
        try {
            String email = authentication.getName();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

            // Kiểm tra quyền huỷ: người tạo booking hoặc admin
            if (!booking.getUser().getId().equals(user.getId()) && !user.getRole().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Bạn không có quyền hủy đặt phòng này.");
            }

            BookingDTO cancelledBooking = bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok(cancelledBooking);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Log lỗi rõ ràng hơn
            return ResponseEntity.internalServerError().body("Lỗi khi hủy đặt phòng: " + e.getMessage());
        }
    }

    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setHomestayId(booking.getRooms().getId().getHomestayId());
        dto.setHomestayName(booking.getRooms().getHomestay().getHomestayName());
        dto.setRoomNumber(booking.getRooms().getId().getRoomNumber());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setAdults(booking.getAdults());
        dto.setChildren(booking.getChildren());
        dto.setTotalPeople(booking.getTotalPeople());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());

        if (booking.getBookingServices() != null && !booking.getBookingServices().isEmpty()) {
            List<ServiceDTO> serviceDTOs = booking.getBookingServices().stream()
                    .map(bs -> {
                        ServiceDTO serviceDTO = new ServiceDTO();
                        serviceDTO.setId(bs.getService().getId());
                        serviceDTO.setPrice(bs.getService().getPrice());
                        serviceDTO.setSpecialNotes(bs.getService().getSpecialNotes());
                        if (bs.getService().getServiceType() != null) {
                            ServiceTypeDTO typeDTO = new ServiceTypeDTO();
                            typeDTO.setServiceName(bs.getService().getServiceType().getServiceName());
                            serviceDTO.setServiceType(typeDTO);
                        }
                        return serviceDTO;
                    })
                    .collect(Collectors.toList());

            dto.setServiceDetails(serviceDTOs);
            List<String> serviceIds = serviceDTOs.stream()
                    .map(s -> String.valueOf(s.getId()))
                    .collect(Collectors.toList());
            dto.setServices(serviceIds);
        }

        return dto;
    }

    @GetMapping("/host/{hostId}")
    @PreAuthorize("hasRole('HOST') and #hostId == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<List<BookingDTO>> getBookingsByHost(@PathVariable Integer hostId) {
        List<BookingDTO> bookings = bookingService.getBookingsByHost(hostId);
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/host/{hostId}/metrics")
    @PreAuthorize("hasRole('HOST') and #hostId == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getHostMetrics(@PathVariable Integer hostId) {
        Map<String, Object> metrics = bookingService.getHostMetrics(hostId);
        System.out.println("Metrics data: " + metrics);
        return ResponseEntity.ok(metrics);
    }
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('USER') and #userId == authentication.principal.id or hasRole('ADMIN')")
    public ResponseEntity<List<BookingDTO>> getBookingsByUser(@PathVariable Integer userId) {
        List<BookingDTO> bookings = bookingService.getBookingsByUser(userId);
        return ResponseEntity.ok(bookings);
    }
}