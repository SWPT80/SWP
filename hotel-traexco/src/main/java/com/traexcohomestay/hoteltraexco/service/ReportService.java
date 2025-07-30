package com.traexcohomestay.hoteltraexco.service;

import com.traexcohomestay.hoteltraexco.repository.ReportBookingRepository;
import com.traexcohomestay.hoteltraexco.repository.ReportBookingServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private ReportBookingRepository bookingRepo;

    @Autowired
    private ReportBookingServiceRepository bookingServiceRepo;

    // ===== 1. Revenue by Homestay =====

    public List<Map<String, Object>> getWeeklyRevenueByHomestay(int hostId) {
        return mapResults(
                bookingRepo.findDailyRevenueByHomestay(hostId),
                "time", "homestayId", "totalRevenue"
        );
    }

    public List<Map<String, Object>> getMonthlyRevenueByHomestay(int hostId) {
        return mapResults(
                bookingRepo.findMonthlyRevenueByHomestay(hostId),
                "time", "homestayId", "totalRevenue"
        );
    }

    public List<Map<String, Object>> getYearlyRevenueByHomestay(int hostId) {
        return mapResults(
                bookingRepo.findYearlyRevenueByHomestay(hostId),
                "time", "homestayId", "totalRevenue"
        );
    }

    // ===== 2. Revenue by Room =====

    public List<Map<String, Object>> getWeeklyRevenueByRoom(int hostId) {
        return mapResults(
                bookingRepo.findDailyRevenueByRoom(hostId),
                "time", "homestayId", "roomNumber", "totalRevenue"
        );
    }

    public List<Map<String, Object>> getMonthlyRevenueByRoom(int hostId) {
        return mapResults(
                bookingRepo.findMonthlyRevenueByRoom(hostId),
                "time", "homestayId", "roomNumber", "totalRevenue"
        );
    }

    public List<Map<String, Object>> getYearlyRevenueByRoom(int hostId) {
        return mapResults(
                bookingRepo.findYearlyRevenueByRoom(hostId),
                "time", "homestayId", "roomNumber", "totalRevenue"
        );
    }

    // ===== 3. Booking Count by Room Type =====

    public List<Map<String, Object>> getRoomTypeBookingCountsWeekly(int hostId) {
        return mapResults(
                bookingRepo.countBookingsByRoomTypeDaily(hostId),
                "time", "homestayId", "roomType", "bookingCount"
        );
    }

    public List<Map<String, Object>> getRoomTypeBookingCountsMonthly(int hostId) {
        return mapResults(
                bookingRepo.countBookingsByRoomTypeMonthly(hostId),
                "time", "homestayId", "roomType", "bookingCount"
        );
    }

    public List<Map<String, Object>> getRoomTypeBookingCountsYearly(int hostId) {
        return mapResults(
                bookingRepo.countBookingsByRoomTypeYearly(hostId),
                "time", "homestayId", "roomType", "bookingCount"
        );
    }

    // ===== 4. Service Revenue =====

    public List<Map<String, Object>> getServiceRevenueWeekly(int hostId) {
        return mapResults(
                bookingServiceRepo.getServiceRevenueByDay(hostId),
                "time", "homestayId", "serviceName", "totalRevenue"
        );
    }

    public List<Map<String, Object>> getServiceRevenueMonthly(int hostId) {
        return mapResults(
                bookingServiceRepo.getServiceRevenueByMonth(hostId),
                "time", "homestayId", "serviceName", "totalRevenue"
        );
    }

    public List<Map<String, Object>> getServiceRevenueYearly(int hostId) {
        return mapResults(
                bookingServiceRepo.getServiceRevenueByYear(hostId),
                "time", "homestayId", "serviceName", "totalRevenue"
        );
    }

    // ===== 5. Service Usage Count =====

    public List<Map<String, Object>> getServiceUsageWeekly(int hostId) {
        return mapResults(
                bookingServiceRepo.countServiceUsageByDay(hostId),
                "time", "homestayId", "serviceName", "bookingCount"
        );
    }

    public List<Map<String, Object>> getServiceUsageMonthly(int hostId) {
        return mapResults(
                bookingServiceRepo.countServiceUsageByMonth(hostId),
                "time", "homestayId", "serviceName", "bookingCount"
        );
    }

    public List<Map<String, Object>> getServiceUsageYearly(int hostId) {
        return mapResults(
                bookingServiceRepo.countServiceUsageByYear(hostId),
                "time", "homestayId", "serviceName", "bookingCount"
        );
    }

    // ===== 6. Users Booked with Host =====

    public List<Map<String, Object>> getUsersBookedWithHost(int hostId) {
        return mapResults(
                bookingRepo.findBookingsWithRoomDetailsByHost(hostId),
                "bookingId", "userId", "userName", "email",
                "checkInDate", "checkOutDate",
                "roomType", "roomPrice",
                "totalPeople", "totalAmount", "status"
        );
    }

    // ===== 7. User Booking and Service Detail =====

    public List<Map<String, Object>> getUserBookingAndServiceDetail(int hostId, int userId) {
        return mapResults(
                bookingRepo.findUserBookingServiceDetail(hostId, userId),
                "bookingId", "checkInDate", "checkOutDate", "totalAmount", "serviceName", "quantity", "price"
        );
    }

    // ===== Helper =====
    private List<Map<String, Object>> mapResults(List<Object[]> rawData, String... keys) {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : rawData) {
            Map<String, Object> map = new LinkedHashMap<>();
            for (int i = 0; i < keys.length; i++) {
                map.put(keys[i], row[i]);
            }
            result.add(map);
        }
        return result;
    }
}
