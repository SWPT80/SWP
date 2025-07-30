package com.traexcohomestay.hoteltraexco.controller;

import com.traexcohomestay.hoteltraexco.dto.ReportBookingInfoDTO;
import com.traexcohomestay.hoteltraexco.dto.ReportDTO;
import com.traexcohomestay.hoteltraexco.model.Room;
import com.traexcohomestay.hoteltraexco.repository.BookingRepository;
import com.traexcohomestay.hoteltraexco.repository.UserRepository;
import com.traexcohomestay.hoteltraexco.service.HostReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/host-reports")
@RequiredArgsConstructor
public class HostReportController {

    private final HostReportService hostReportService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ReportDTO> createReport(@RequestBody ReportDTO reportDTO) {
        return ResponseEntity.ok(hostReportService.submitReport(reportDTO));

    }

    @GetMapping("/my")
    public ResponseEntity<List<ReportDTO>> getMyReports(Authentication auth) {
        String email = auth.getName();
        return userRepository.findByEmail(email).map(user -> ResponseEntity.ok(hostReportService.getReportsByUser(user.getId()))).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/admin")
    public ResponseEntity<List<ReportDTO>> getReportsForAdmin(Authentication auth) {
        return ResponseEntity.ok(hostReportService.getAllReportsForAdmin());
    }

    @PutMapping("/{reportId}/resolve")
    public ResponseEntity<ReportDTO> resolveReport(@PathVariable Integer reportId, @RequestBody ReportDTO resolutionDTO) {
        return ResponseEntity.ok(hostReportService.resolveReport(reportId, resolutionDTO));
    }

    @GetMapping("/booking-info/{bookingId}")
    public ResponseEntity<?> getBookingInfoForReport(@PathVariable Integer bookingId) {
        return bookingRepository.findById(bookingId).map(booking -> {
            ReportBookingInfoDTO dto = new ReportBookingInfoDTO();
            dto.setBookingId(booking.getId());
            dto.setUserId(booking.getUser().getId());

            // Lấy thông tin phòng đầu tiên (giả sử 1 phòng/booking)
            Room room = booking.getRooms(); // nếu đổi tên thì sửa ở đây
            dto.setHomestayId(room.getHomestay().getHomestayId());
            dto.setRoomNumber(room.getRoomNumber());

            List<ReportBookingInfoDTO.ServiceSummary> services = booking.getBookingServices().stream().map(bs -> new ReportBookingInfoDTO.ServiceSummary(bs.getId().getServiceId(), bs.getService() != null && bs.getService().getServiceType() != null ? bs.getService().getServiceType().getServiceName() : "Dịch vụ #" + bs.getId().getServiceId())).toList();

            dto.setServiceDetails(services);

            return ResponseEntity.ok(dto);
        }).orElse(ResponseEntity.notFound().build());
    }

}
