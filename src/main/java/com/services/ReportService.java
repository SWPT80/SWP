package com.services;

import com.respository.BookingRepository;
import com.respository.BookingServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReportService {

    @Autowired
    private BookingRepository bookingRepo;

    @Autowired
    private BookingServiceRepository bookingServiceRepo;

    public List<Map<String, Object>> getMonthlyRevenue(int hostId) {
        return mapResults(
                bookingRepo.findMonthlyRevenueByHomestay(hostId),
                "month", "homestayId", "totalRevenue"
        );
    }

    public List<Map<String, Object>> getRevenueByRoom(int hostId) {
        return mapResults(
                bookingRepo.findMonthlyRevenueByRoom(hostId),
                "month", "homestayId", "roomNumber", "totalRevenue"
        );
    }

    public List<Map<String, Object>> getRoomTypeBookingCounts(int hostId) {
        return mapResults(
                bookingRepo.countBookingsByRoomTypeMonthly(hostId),
                "month", "homestayId", "roomType", "bookingCount"
        );
    }

    public List<Map<String, Object>> getRevenueByService(int hostId) {
        return mapResults(
                bookingServiceRepo.getDetailedServiceRevenuePerMonth(hostId),
                "month", "homestayId", "serviceName", "totalRevenue"
        );
    }

    public List<Map<String, Object>> getServiceUsageCounts(int hostId) {
        return mapResults(
                bookingServiceRepo.countServiceBookingsByMonthAndHomestayAndService(hostId),
                "month", "homestayId", "serviceName", "bookingCount"
        );
    }

    public List<Map<String, Object>> getUsersBookedWithHost(int hostId) {
        return mapResults(
                bookingRepo.findUserBookingsByHost(hostId),
                "userId", "fullName", "email", "homestayId", "checkInDate", "checkOutDate", "totalAmount", "status"
        );
    }

    public List<Map<String, Object>> getUserBookingAndServiceDetail(int hostId, int userId) {
        return mapResults(
                bookingRepo.findUserBookingServiceDetail(hostId, userId),
                "bookingId", "checkInDate", "checkOutDate", "totalAmount", "serviceName", "quantity", "price"
        );
    }

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
