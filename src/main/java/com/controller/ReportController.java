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

    // 1. Doanh thu theo homestay (week | month | year)
    @GetMapping("/revenue")
    public ResponseEntity<?> getRevenue(
            @RequestParam int hostId,
            @RequestParam(defaultValue = "month") String range
    ) {
        return switch (range.toLowerCase()) {
            case "day" -> ResponseEntity.ok(reportService.getWeeklyRevenueByHomestay(hostId));
            case "year" -> ResponseEntity.ok(reportService.getYearlyRevenueByHomestay(hostId));
            default -> ResponseEntity.ok(reportService.getMonthlyRevenueByHomestay(hostId));
        };
    }

    // 2. Doanh thu theo phòng (week | month | year)
    @GetMapping("/revenue/room")
    public ResponseEntity<?> getRevenueByRoom(
            @RequestParam int hostId,
            @RequestParam(defaultValue = "month") String range
    ) {
        return switch (range.toLowerCase()) {
            case "day" -> ResponseEntity.ok(reportService.getWeeklyRevenueByRoom(hostId));
            case "year" -> ResponseEntity.ok(reportService.getYearlyRevenueByRoom(hostId));
            default -> ResponseEntity.ok(reportService.getMonthlyRevenueByRoom(hostId));
        };
    }

    // 3. Doanh thu theo dịch vụ (week | month | year)
    @GetMapping("/revenue/service")
    public ResponseEntity<?> getRevenueByService(
            @RequestParam int hostId,
            @RequestParam(defaultValue = "month") String range
    ) {
        return switch (range.toLowerCase()) {
            case "day" -> ResponseEntity.ok(reportService.getServiceRevenueWeekly(hostId));
            case "year" -> ResponseEntity.ok(reportService.getServiceRevenueYearly(hostId));
            default -> ResponseEntity.ok(reportService.getServiceRevenueMonthly(hostId));
        };
    }

    // 4. Số lượt đặt theo loại phòng (week | month | year)
    @GetMapping("/count/bookings")
    public ResponseEntity<?> getRoomTypeBookingCount(
            @RequestParam int hostId,
            @RequestParam(defaultValue = "month") String range
    ) {
        return switch (range.toLowerCase()) {
            case "day" -> ResponseEntity.ok(reportService.getRoomTypeBookingCountsWeekly(hostId));
            case "year" -> ResponseEntity.ok(reportService.getRoomTypeBookingCountsYearly(hostId));
            default -> ResponseEntity.ok(reportService.getRoomTypeBookingCountsMonthly(hostId));
        };
    }

    // 5. Số lượt sử dụng dịch vụ (week | month | year)
    @GetMapping("/count/services")
    public ResponseEntity<?> getServiceUsageCount(
            @RequestParam int hostId,
            @RequestParam(defaultValue = "month") String range
    ) {
        return switch (range.toLowerCase()) {
            case "day" -> ResponseEntity.ok(reportService.getServiceUsageWeekly(hostId));
            case "year" -> ResponseEntity.ok(reportService.getServiceUsageYearly(hostId));
            default -> ResponseEntity.ok(reportService.getServiceUsageMonthly(hostId));
        };
    }

    // 6. Danh sách người dùng đã từng đặt homestay
    @GetMapping("/bookings/by-user")
    public ResponseEntity<?> getUsersBookedWithHost(@RequestParam int hostId) {
        return ResponseEntity.ok(reportService.getUsersBookedWithHost(hostId));
    }

    // 7. Chi tiết booking và dịch vụ của 1 user
    @GetMapping("/bookings/user-service-detail")
    public ResponseEntity<?> getUserBookingDetail(
            @RequestParam int hostId,
            @RequestParam int userId) {
        return ResponseEntity.ok(reportService.getUserBookingAndServiceDetail(hostId, userId));
    }
}
