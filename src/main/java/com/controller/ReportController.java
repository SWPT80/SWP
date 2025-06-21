package com.controller;

import com.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // 1. Doanh thu theo tháng của từng homestay
    @GetMapping("/revenue/monthly")
    public ResponseEntity<?> getMonthlyRevenue(@RequestParam int hostId) {
        return ResponseEntity.ok(reportService.getMonthlyRevenue(hostId));
    }

    // 2. Doanh thu theo từng phòng của host
    @GetMapping("/revenue/room")
    public ResponseEntity<?> getRevenueByRoom(@RequestParam int hostId) {
        return ResponseEntity.ok(reportService.getRevenueByRoom(hostId));
    }

    // 3. Doanh thu theo từng loại dịch vụ
    @GetMapping("/revenue/service")
    public ResponseEntity<?> getRevenueByService(@RequestParam int hostId) {
        return ResponseEntity.ok(reportService.getRevenueByService(hostId));
    }

    // 4. Số lượt đặt theo loại phòng
    @GetMapping("/count/bookings")
    public ResponseEntity<?> getRoomTypeBookingCount(@RequestParam int hostId) {
        return ResponseEntity.ok(reportService.getRoomTypeBookingCounts(hostId));
    }

    // 5. Số lượt sử dụng dịch vụ
    @GetMapping("/count/services")
    public ResponseEntity<?> getServiceUsageCount(@RequestParam int hostId) {
        return ResponseEntity.ok(reportService.getServiceUsageCounts(hostId));
    }

    // 6. Lấy danh sách người dùng đã từng đặt homestay của host
    @GetMapping("/bookings/by-user")
    public ResponseEntity<?> getUsersBookedWithHost(@RequestParam int hostId) {
        return ResponseEntity.ok(reportService.getUsersBookedWithHost(hostId));
    }

    // 7. Lấy chi tiết dịch vụ và booking của 1 user đối với host
    @GetMapping("/bookings/user-service-detail")
    public ResponseEntity<?> getUserBookingDetail(
            @RequestParam int hostId,
            @RequestParam int userId) {
        return ResponseEntity.ok(reportService.getUserBookingAndServiceDetail(hostId, userId));
    }
}
